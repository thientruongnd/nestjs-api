import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'; //import a "folder"
@Controller('auth')
export class AuthController {
  // auth service is automatically created when initialization the controller
  constructor(private authService: AuthService) {}
  // some request from client
  @Post('register') // register a new user
  // body type must be a "Data Transfer Object" - DTO
  register(@Body() authDto: AuthDto) {
    // body type must be a "Data Transfer Object" - DTO
    return this.authService.register(authDto);
  }
  @Post('login') // login at a user
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
`
// export is make public`;
