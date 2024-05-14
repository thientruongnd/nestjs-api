import { Controller, Get, UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard) // you can also make your own "decorator"
  @Get('me')
  me(@GetUser() user: User) {
    console.log('this log', user);
    return user;
  }
}
