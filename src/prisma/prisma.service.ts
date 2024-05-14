import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          //url: 'postgresql://postgres:postgres@localhost:5434/mydb?schema=public',
          url: configService.get('DATABASE_URL'),
        },
      },
    });
    console.log('this log', JSON.stringify(configService));
  }
  cleanDatabase() {
    console.log('this log : cleanDatabase');
    // In a 1-N relation, delete N firstly, then delete "1"
    return this.$transaction([
      // two commands in one transaction
      this.note.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
