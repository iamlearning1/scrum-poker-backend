import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { validate, v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { UserService } from './user.service';

const mockUser = {
  id: 7,
  email: 'test@test.com',
  firstName: 'new',
  lastName: 'user',
  room: uuidv4() as string,
};

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    create: () => mockUser,
    save: () => null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await service.create(mockUser);

    expect(user).toBeDefined();
    expect(user.id).toBe(mockUser.id);
    expect(user.email).toBe(mockUser.email);
  });

  it('should create a random room id that has a unique id', () => {
    const id = service.createRoom();

    expect(validate(id)).toBe(true);
  });
});
