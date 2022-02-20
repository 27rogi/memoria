import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { JoiValidationPipe } from 'src/utils/joi.pipe';
import { Permissions } from 'src/utils/permissions.decorator';
import { UsersService } from '../services/users.service';
import { createUser } from '../validation/user.validation';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('users/:userId')
  @Bind(Req())
  getUserById(request) {
    return request.params;
  }

  @Post('users')
  create(@Body(new JoiValidationPipe(createUser)) body) {
    return body;
  }

  @Get('users')
  @Bind(Req())
  getAll(request) {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('accessAccountInfo')
  @Get('user')
  userProfile(@Req() req) {
    return this.userService.getUserFromRequest(req);
  }
}
