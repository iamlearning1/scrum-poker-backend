import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Room (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should add a user to an existing room', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(
              data: {
                email: "newuser2@test.com"
                firstName: "new"
                lastName: "user2"
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
        expect(res.body.data.createUser.email).toBe('newuser2@test.com');
      });
  });
});
