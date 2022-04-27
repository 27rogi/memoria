import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { hashPassword } from 'src/utils/password';
import { User } from 'src/users/schemas/user.schema';
import { Request } from 'express';
import { Token, TokenDocument } from '../schemas/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>, private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findOne({ email }, false);
    if (user) {
      if (hashPassword(password) === user.password) return user;
      else throw new HttpException('Passwords do not match!', HttpStatus.UNAUTHORIZED);
    } else {
      return null;
    }
  }

  async register(body: any) {
    const user = await this.usersService.findOne({ email: body.email });
    if (user) {
      throw new HttpException('User with this email already exists!', HttpStatus.UNAUTHORIZED);
    }

    const newUser = await this.usersService.create(body);
    return this.login(newUser.email, body.password);
  }

  async login(email: string, password: string) {
    const user: any = await this.validateUser(email, password);
    if (user) {
      return this.generateTokens(user);
    }
    return null;
  }

  async refreshTokens(token: string) {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }

    const refreshToken = await this.getRefreshToken(token);
    if (!refreshToken) throw new HttpException('This token expired!', HttpStatus.UNAUTHORIZED);

    const user = await this.usersService.findOne({ _id: refreshToken.user }, false);

    if (!user) throw new HttpException('This user does not exist!', HttpStatus.UNAUTHORIZED);

    return this.generateTokens(user);
  }

  async getRefreshToken(token: string) {
    return await this.tokenModel.findOne({ token });
  }

  async getRefreshTokenFromUser(user) {
    if (user) {
      const refreshToken = await this.tokenModel.findById({
        user: user._id,
      });
      return refreshToken;
    }
    return null;
  }

  async generateTokens(user: any) {
    if (user) {
      const payload = { sub: user._id, email: user.email };
      const refreshToken = this.jwtService.sign(
        { ...payload, type: 'refresh' },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRES,
        },
      );

      const tokenDoc = await this.tokenModel.findOne({ user: user._id });
      if (tokenDoc) await tokenDoc.remove();

      await this.tokenModel.create({
        user: user._id,
        token: refreshToken,
      });

      return {
        access_token: this.jwtService.sign({ ...payload, type: 'access' }),
        refresh_token: refreshToken,
      };
    }
    return null;
  }
}
