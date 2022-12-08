import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const user = {
  email: 'newuser1@test.com',
  firstName: 'new',
  lastName: 'user1',
};

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('should query hello world', () => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `{ hello }`,
  //     })
  //     .expect(200)
  //     .expect((res) => expect(res.body.data.hello).toEqual('Hello World!'));
  // });

  it('should create the user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(
              data: {
                email: "newuser1@test.com"
                firstName: "new"
                lastName: "user1"
              }
            ) {
              id
              email
              firstName
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser.email).toBe('newuser1@test.com');
      });
  });
});
