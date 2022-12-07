import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const mockUser = {
  id: 4,
  email: 'test2@test.com',
  firstName: 'new',
  lastName: 'user',
};

describe('UserResolver', () => {
  let resolver: UserResolver;
  const mockUserService: Partial<UserService> = {
    create: () => Promise.resolve(mockUser) as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new user and return the user', async () => {
    const user = await resolver.createUser(mockUser);

    expect(user).toBeDefined();
    expect(user.id).toBe(mockUser.id);
  });
});
