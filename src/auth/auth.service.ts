/**
 * Created by Truong on 10/05/24.
 * truongdx@runsystem.net - Xuan Truong
 * Function Name
 * */
import { ForbiddenException, Injectable } from '@nestjs/common';
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
  async register(authDto: AuthDto) {
    // generate hash password  to hashPassword
    const hashedPassword = await argon.hash(authDto.password);
    // insert data to database
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hashedPassword: hashedPassword,
          firstName: '',
          lastName: '',
        },
        // only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      // you should add constraints "unique" to email
      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException('Error email already exist');
      }
      return {
        error: err,
      };
    }
  }

  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Error email or password');
    }
    const pwMatches = await argon.verify(user.hashedPassword, authDto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Error email or password');
    }
    delete user.hashedPassword;
    return user;
  }
}
