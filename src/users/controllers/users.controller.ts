import { Bind, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { JoiValidationPipe } from 'src/utils/joi.pipe';
import { Permissions } from 'src/utils/permissions.decorator';
import { UsersService } from '../services/users.service';
import { createUser } from '../validations/user.validation';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('users/:userId')
  @Bind(Req())
  getUserById(request) {
    return request.params;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @Bind(Req())
  getAll(request) {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('createUsers')
  @Post('users')
  create(@Body(new JoiValidationPipe(createUser)) body) {
    return body;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  userProfile(@Req() req) {
    return this.userService.getUserFromRequest(req);
  }
}
