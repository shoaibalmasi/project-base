import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException
} from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Hash } from 'src/common/bcrypt/hash.bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../../privatekey';
import { RedisCacheService } from 'src/api/redis-cache/redis-cache.service';
// import { dbConfig } from 'src/postgre/database.providers';
import { signInDto } from 'src/dto/user.dto';
import { Func, Network, Role, RoleFunc, UserRole } from 'src/models';
import { otpRegisterResponse, payloadInterface, tokensInterface} from 'src/api/auth/interfaces/auth.inteface';
import { Responser } from 'src/common/utils/responser';
import { Op } from 'sequelize';
import * as _ from 'lodash';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(RoleFunc)
    private roleFuncModel : typeof RoleFunc,
    @InjectModel(Func)
    private funcModel : typeof Func,
    @InjectModel(Role)
    private roleModel : typeof Role,
    @InjectModel(Network)
    private networkModel : typeof Network,
    
    private jwtService: JwtService,
    private redis : RedisCacheService,
  ) {

  }
  async login(data: signInDto): Promise<tokensInterface> {

    const {grant_type, password, username, refresh_token} =data
     let user: User

    if(grant_type == 'refresh_token' && !refresh_token)
      throw new BadRequestException('رفرش توکن را ارسال کنید');

    if(grant_type == 'password' && (!password || !username))
    throw new BadRequestException('رمز عبور یا نام کاربری ارسال نشده');


    if(grant_type == 'refresh_token'){
      let checkRefreshToken
      try {
         checkRefreshToken = this.jwtService.verify(refresh_token,{secret: jwtConstants.refreshSecret})
        
      } catch (error) {
            throw new UnauthorizedException('رفرش توکن اعتبار ندارد')

      }

      user = await this.userModel.findOne({
      where: { id: +checkRefreshToken.id},
      attributes: ['id', "firstName", "lastName","username","password","lastRoleId"],
      raw: true,
    });

    }else if (grant_type == 'password'){

       user = await this.userModel.findOne({
        where: { username },
        attributes: ['id', "firstName", "lastName","username","password","lastRoleId"],
        raw: true,
      });
      
      if (!user) throw new NotFoundException('نام کاربری یافت نشد');


      let checkPassword = await Hash.compare(
        password.toString(),
        user.password,
      );
      if (!checkPassword) throw new UnauthorizedException('رمز عبور اشتباه است');

    }

     let result = await this.authorize({user, roleId: data.roleId})
    //  console.log({result});
     return result
  }

  async logout(userId): Promise<Boolean> {

    await this.redis.del( `accessToken_${userId}`)
    await this.redis.del(`refreshToken_${userId}`)
    return true

  }

  async otpRegister(data): Promise<otpRegisterResponse>{
    let {cellphone, roleId} = data
    // if(!roleId) roleId = process.env.BUYER_ROLE_ID
    // if(roleId != process.env.BUYER_ROLE_ID && roleId != process.env.SELLER_ROLE_ID)
    // throw new ForbiddenException('تنها نقش فروشنده و خریدار امکان ورود دارند')

    let user = await this.userModel.findOne({
      where: {cellphone},
      raw:true
    })

    let message = ''
    let userRole = null
    if(user){
       userRole = await this.userRoleModel.findOne({
        where: {userId: user.id},
        order: [['id', 'desc']],
        raw:true
      })
      if(!userRole){
        await this.userRoleModel.create({
          userId: user.id,
          roleId: process.env.BUYER_ROLE_ID,
          networkId: process.env.MAIN_NETWORK_ID,
          level: 1
        })
      }
      // if(!userRole && roleId == process.env.SELLER_ROLE_ID){
      //   throw new ForbiddenException('این شماره به عنوان فروشنده ثبت نشده است');
        
      // }
      roleId = userRole.roleId || process.env.BUYER_ROLE_ID
      message = 'کد ارسال شد'

    } else {
      user = await this.userModel.create({cellphone, status: true})
      await this.userRoleModel.create({
        userId: user.id,
        roleId: process.env.BUYER_ROLE_ID,
        networkId: process.env.MAIN_NETWORK_ID,
        status: true,
        level: 1
      })

      roleId = process.env.BUYER_ROLE_ID
      message = 'ثبت نام با موفقیت انجام شد - کد ارسال شد'

    } 

    let code = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    await this.redis.set(`OTP_${user.id}`, code, 60)

    //send SMS
    console.log({code});
    // await this.sms.sendOneByPattern({phone: user.cellphone, text: code})
    
    return {
      cellphone,
      roleId,
      message
    }

  }

  async otpLogin(data): Promise<tokensInterface>{
  
    let {cellphone, roleId, code} = data
    let user = await this.userModel.findOne({
      where: {cellphone},
      raw:true,
      include:[
        {
          model: this.userRoleModel,
          required: true,
          as: "userRole",
          where: {roleId}
        }
      ],

    })
console.log({user});

    if(!user) throw new NotFoundException('کاربر با نقش ارسال شده یافت نشد')

    let checkCode = await this.redis.get(`OTP_${user.id}`)
    if(!checkCode || (checkCode != code))
    throw new ForbiddenException('کد ارسال شده منقضی شده است و یا معتبر نیست')

    let result = await this.authorize({user, roleId: data.roleId})
    await this.redis.del(`OTP_${user.id}`)
    return result
  }

  async authorize(data): Promise<tokensInterface>{
 
    let {user} = data

    let checkUserRole = await this.userRoleModel.findOne({
      where: {userId: user.id , roleId : data.roleId || user.lastRoleId},
      include:[
        {
          model: this.networkModel,
          required: true,
          as: "network",
          attributes: ['name',"id"]
        }
      ],
      raw: true
    })

    if(!checkUserRole) throw new UnauthorizedException('این نقش برای کاربر تعریف نشده است');


    const roleId = data.roleId || user.lastRoleId
    let role = await this.roleModel.findOne({
      where: {id: roleId, status: true}
    })

    if(!role) throw new NotFoundException('نقش یافت نشد و یا غیر فعال است')

    // let store = await this.storeModel.findOne({
    //   where: {userId: user.id},
    //   raw: true,
    //   order:[['id', 'desc']]
    // });



  
    let payload : payloadInterface ={
      id : user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      lastRoleId: user.lastRoleId,
      roleId,
      roleName: role.name,
      networkId: checkUserRole['network.id'],
      networkName: checkUserRole['network.name'],
    }

    let accessToken = this.jwtService.sign(payload,{
      secret: jwtConstants.secret,
      expiresIn: process.env.ACCESS_EXPIRE
    })

     let refreshToken =  this.jwtService.sign(payload,{
      secret: jwtConstants.refreshSecret,
      expiresIn: process.env.REFRESH_EXPIRE
    })

    await this.redis.set( `accessToken_${user.id}`,accessToken
    // , 
    // process.env.ACCESS_EXPIRE
     )
    await this.redis.set(`refreshToken_${user.id}`,refreshToken 
    // , process.env.REFRESH_EXPIRE
    )
    await this.userModel.update({lastRoleId: roleId},{where: {id:user.id}})

    return {
      accessToken,
      refreshToken,
      userId : user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      roleId,
      roleName: role.name,
      // hasStoreRequest: store ? true: false,
    };
  }

  async switchRole(data): Promise<tokensInterface>{
    const {userRoleId, payload} = data
    let userRole = await this.userRoleModel.findOne({
      where: {id : userRoleId, userId: payload.id}
    })
    if(!userRole) throw new NotFoundException('شناسه نقش کاربر نامعتبر است')

    let user = await this.userModel.findByPk(payload.id, {raw:true})

    if(!user) throw new NotFoundException('کاربر یافت نشد')

    let result = await this.authorize({user, roleId: userRole.roleId})
    
    return result
  }


  // async refreshTokens(refreshToken: string): Promise<any> {
  //   const user = await this.userModel.findOne({
  //     where: {
  //       id: userId,
  //     },
  //   });
  //   if (!user) throw new ForbiddenException('Access Denied');

  //   let checkRefreshToken = await this.redis.get(`refreshToken_${user.id}`)
  //   if(checkRefreshToken) throw new ForbiddenException('Access Denied');

    

  //   let access_token = this.jwtService.sign(payload,{
  //     secret: jwtConstants.secret,
  //     expiresIn: '30s'
  //   })

  //   let refresh_token =  this.jwtService.sign(payload,{
  //     secret: 'rt_secret',
  //     expiresIn: '2m'
  //   })

  //   return tokens;
  // }

}
