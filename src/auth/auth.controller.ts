import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    // login処理が成功すればjwtが返ってくる
    const jwt = await this.authService.login(dto);
    // クッキーにアクセストークンを付与する
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'success',
    };
  }
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response): Msg {
    // クッキーを削除する
    res.cookie('access_token', '', {
      httpOnly: true,
      // postmanで確認する場合はfalseにする
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ログアウトしました',
    };
  }
}
