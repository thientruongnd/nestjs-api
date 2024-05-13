import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'; //import a "folder"
@Controller('auth')
export class AuthController {
  // auth service is automatically created when initialization the controller
  constructor(private authService: AuthService) {
    authService.doSomething();
  }
  // some request from client
  @Post('register') // register a new user
  // body type must be a "Data Transfer Object" - DTO
  register(@Body() body: AuthDto) {
    // not validate using class-validator AND class-transformer
    return this.authService.register();
  }
  @Post('login') // login at a user
  login() {
    return this.authService.login();
  }
}
`
// export is make public`;
