import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { People } from './people.entity';
import { PeopleService } from './people.service';

const mockJoin = {
  id: 'random-id',
  owner: 'user1',
  joiner: 'user2',
};

describe('PeopleService', () => {
  let service: PeopleService;
  const mockPeopleRepository = {
    create: () => mockJoin,
    save: () => null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getRepositoryToken(People),
          useValue: mockPeopleRepository,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should join the user to the room', async () => {
    const joined = await service.create(mockJoin);

    expect(joined).toBeDefined();
    expect(joined.id).toBe(mockJoin.id);
    expect(joined.owner).toBe(mockJoin.owner);
    expect(joined.joiner).toBe(mockJoin.joiner);
  });
});
