import {
  Body,
  Controller,
  Request,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { loginDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() data: loginDto) {
    return this.userService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Request() data): Promise<object> {
    return this.userService.logout(data.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/info')
  async info(@Query() data: string): Promise<object> {
    return this.userService.info(data);
  }
}
