// make a database for testing!
// Everytime we run tests, clean up data
// We must call request like we do with Postman
// How to open prisma studio on "TEST" database?
// npx dotenv -e .env.test -- prisma studio
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
const PORT = 3100;
describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });
  describe('Test Authentication', () => {
    describe('Register', () => {
      it('should Register', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: 'truongdx@example.com',
            password: '123@abcTest',
            firstName: 'John',
            lastName: 'Doe',
          })
          .expectStatus(201);
        //.inspect();
      });
    });
    describe('Login', () => {
      it('should Login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'truongdx@example.com',
            password: '123@abcTest',
          })
          .expectStatus(201)
          .stores('accessToken', 'accessToken');
        // .inspect();
      });
    });
    describe('User', () => {
      it('should get user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .expectStatus(200)
          .expectBodyContains('truongdx@example.com')
          .expectBodyContains('John')
          .expectBodyContains('Doe');
      });
    });
    describe('Note', () => {
      describe('Insert Note', () => {
       
      });
      describe('Get all Note', () => {
       
      });
      describe('Get Note by id', () => {
       
      });
      describe('Insert Note', () => {
       
      });
    });
  });
  afterAll(async () => {
    console.log('this log appClose');
    await app.close();
  });
  it.todo('Should pass 1');
});
