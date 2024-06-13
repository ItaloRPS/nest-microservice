import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './types/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GoogleTokenGuard } from './guards/google-token.guard';

@Controller("auth")
export class AuthController {
  constructor( private readonly authService: AuthService ) {}

  @IsPublic ()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @IsPublic ()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  @HttpCode(HttpStatus.OK)
  async loginGoogle(@Request() req: AuthRequest) {}


  @IsPublic ()
  @UseGuards(GoogleTokenGuard)
  @Get('google/login')
  @HttpCode(HttpStatus.OK)
  async callback(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user)
    return res.json(jwt)
  }

}