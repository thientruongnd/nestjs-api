/**
 * Created by Truong on 10/05/24.
 * truongdx@runsystem.net - Xuan Truong
 * Function Name
 * */
import { Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  doSomething() {
    console.log('Auth service do something!');
  }
  register(authDto: AuthDto) {
    const hashPassword = argon.hash(authDto.password);
    return { message: 'Register an user' + hashPassword };
  }

  login() {
    return { message: 'this is login' };
  }
}
