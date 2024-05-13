import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Global() // This module is used in other Global modules!
@Module({
  providers: [PrismaService, ConfigService],
  exports: [PrismaService], // other modules can use PrismaService
})
export class PrismaModule {}
