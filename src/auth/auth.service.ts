/**
 * Created by Truong on 10/05/24.
 * truongdx@runsystem.net - Xuan Truong
 * Function Name
 * */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async register(authDto: AuthDto) {
    const hashedPassword = await argon.hash(authDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hashedPassword: hashedPassword,
          firstName: '',
          lastName: '',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return this.convertToJwtString(user.id, user.email);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException('Email đã tồn tại');
      }
      throw err;
    }
  }

  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email hoặc mật khẩu không chính xác');
    }

    const pwMatches = await argon.verify(user.hashedPassword, authDto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Email hoặc mật khẩu không chính xác');
    }

    delete user.hashedPassword;
    return await this.convertToJwtString(user.id, user.email);
  }

  async convertToJwtString(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
