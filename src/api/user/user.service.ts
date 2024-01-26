import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  createUserDto,
  deleteUserDto,
  removeAddressDto,
  removeUserRoleDto,
  updateUserDto,
  userAddressAddDto,
  userInfoDto,
  userListDto,
  userRoleAddDto,
} from 'src/dto/user.dto';
import { User } from 'src/models/user.model';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import { Role } from 'src/models/role.model';
import { Network } from 'src/models/network.model';
import { UserRole } from 'src/models/userRole.model';
// import * as db from '../../models'
import { Responser } from 'src/common/utils/responser';
import { UserAddress } from 'src/models/userAddress.model';
import { UtilsService } from 'src/api/utils/utils.service';
import { payloadInterface } from '../auth/interfaces/auth.inteface';
import * as moment from 'moment-jalaali';
import configuration from 'config/configuration';
@Injectable()
export class userService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Network)
    private networkModel: typeof Network,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(UserAddress)
    private userAddressModel: typeof UserAddress,

    private utilsService: UtilsService,
  ) {}

  async userInfo(input: {
    data: userInfoDto;
    payload: payloadInterface;
  }): Promise<User> {
    let { id, role, address } = input.data;
    if (!id) id = input.payload.id;

    let include = [];
    if (role) {
      include.push({
        model: this.roleModel,
        required: true,
        as: 'roles',
        attributes: ['id', 'name', 'description', 'status'],
        through: { attributes: ['networkId', 'level', 'createdAt',['id', 'userRoleId']] },
      });
    }

    if (address) {
      include.push({
        model: this.userAddressModel,
        as: 'addresses',
        attributes: [
          'id',
          'address',
          'postalCode',
          'provinceId',
          'cityId',
          'cityName',
          'provinceName',
          'createdAt',
        ],
      });
    }

    let user = await this.userModel.findByPk(id, {
      // raw: true,
      attributes: [
        'id',
        'firstName',
        'lastName',
        'username',
        'nationalId',
        'status',
        'birthDate',
        'cellphone',
        'email',
        'createdAt',
        'completeProfile'
      ],
      include,
    });
    if (!user) throw new NotFoundException('کاربر یافت نشد');

    return user;
  }

  async updateUser(input: {data: updateUserDto,  payload: payloadInterface}): Promise<number> {
    const {data, payload} = input
    let { id } = data;

    if(payload.roleId != +process.env.SUPER_ADMIN_ROLE_ID && id != payload.id)
    throw new HttpException('شما اجازه ویرایش اطلاعات دیگر کاربران را ندارید',403)
    
    let user = await this.userModel.findByPk(id, { raw: true });
    if (!user) throw new NotFoundException('شناسه کاربر معتبر نیست');

    let dataObj = this.utilsService.omitNull(data);

    if(dataObj.nationalId){
      let similarNationalId = await this.userModel.findOne({
        where: {nationalId: dataObj.nationalId , id: {[Op.ne]: id}},
        raw:true
      })

      if(similarNationalId) throw new HttpException('کد ملی ارسال شده تکراری است',400)
    }

    const result = await this.userModel.update(dataObj, { where: { id } , individualHooks: true,});
    this.updateUserProfileComplete({userId: user.id})
    if (!result) throw new NotFoundException('کاربر یافت نشد');


    return result[0];
  }

  async addUserAddress(input:{data: userAddressAddDto,payload: payloadInterface}): Promise<UserAddress> {
    const {data, payload} = input
    let { userId, address, postalCode, cityId, location } = data;

    if(payload.roleId != +process.env.SUPER_ADMIN_ROLE_ID && userId && userId != payload.id ){
      throw new HttpException('شما امکان افزودن آدرس به کاربری غیر از خودتان را ندارید',403)
    }
    if(!userId) userId = payload.id

    let user = await this.userModel.findOne({
      where: { id: userId, status: true },
      raw: true,
    });
    if (!user) throw new NotFoundException('کاربر یافت نشد یا غیر فعال است');

    //TODO check location 

    let city = await this.networkModel.findOne({
      where: {id: cityId, level: 3},
      raw:true
    })
    if(!city) throw new HttpException('شهر یافت نشد', 404)

    let result = await this.userAddressModel.create({
      userId,
      postalCode,
      address,
      provinceId: city.pid,
      cityId,
      cityName: city.name,
      provinceName: city.parentsName[1],
      location,
    });
    return result;
  }

  async getUserRole(payload: payloadInterface): Promise<any> {
    let userRoleList = await this.userRoleModel.findAll({
      where: { userId: payload.id },
      attributes: ['id'],
      include: [
        {
          model: this.roleModel,
          required: true,
          as: 'role',
          attributes: ['id', 'name'],
        },
        {
          model: this.networkModel,
          required: true,
          as: 'network',
          attributes: ['name', 'id'],
        },
      ],
      raw: true,
    });

    let list = userRoleList.map((item) => {
      return {
        id : item.id,
        userId: payload.id,
        roleId: item['role.id'],
        roleName: item['role.name'],
        networkId: item['network.id'],
        networkName: item['network.name'],
      };
    });

    return list;
  }

  async updateUserProfileComplete(data): Promise<void>{
    const {userId} = data
    let completeProfile = false
    let user = await this.userModel.findByPk(userId, {raw:true})
    if(user && 
      user.firstName &&
      user.lastName &&
      user.nationalId &&
      user.birthDate  &&
      user.gender != null &&
      user.isMarried != null &&
      user.education
    ){
      completeProfile = true
    }

    await this.userModel.update(
      {completeProfile},
      {where: {id: userId}}
    )
  }

  async removeAddress(input:{data: removeAddressDto, payload: payloadInterface}): Promise<number>{
    
    let result = await this.userAddressModel.destroy({
      where: { id: input.data.id, userId: input.payload.id },
    });

    if (!result) throw new NotFoundException('شناسه ارسال شده معتبر نیست');
    return result;
  }
}
