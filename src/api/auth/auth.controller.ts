import {
  Controller,
  Body,
  Post,
  UsePipes,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  otpLoginDto,
  otpRegisterDto,
  signInDto,
  switchRoleDto,
} from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  otpRegisterResponse,
  payloadInterface,
  tokensInterface,
} from './interfaces/auth.inteface';
import { JoiPipe } from 'nestjs-joi';
import { Payload } from 'src/common/decorator/payload.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(JoiPipe)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'ورود با نام کاربری و رمز عبور',
  })
  async login(@Body() data: signInDto): Promise<tokensInterface> {
    return await this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @ApiOperation({
    description: 'خروج',
  })
  async logout(@Request() data: any): Promise<Boolean> {
    return await this.authService.logout(data.user.id);
  }

  @Post('otpRegister')
  @UsePipes(JoiPipe)
  @ApiOperation({
    description: 'ثبت نام/ورود با رمز یک بار مصرف',
  })
  async otpRegister(
    @Body() data: otpRegisterDto,
  ): Promise<otpRegisterResponse> {
    return await this.authService.otpRegister(data);
  }

  @Post('otpLogin')
  @UsePipes(JoiPipe)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'ورود با رمز یک بار مصرف',
  })
  async otpLogin(@Body() data: otpLoginDto): Promise<tokensInterface> {
    return await this.authService.otpLogin(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('switchRole')
  @UsePipes(JoiPipe)
  @ApiOperation({
    description: 'تغییر نقش',
  })
  async switchRole(
    @Body() data: switchRoleDto,
    @Payload() payload: payloadInterface,
  ): Promise<tokensInterface> {
    return await this.authService.switchRole({
      userRoleId: data.userRoleId,
      payload,
    });
  }
}
