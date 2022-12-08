import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomService } from './room.service';

const mockJoin = {
  owner: 'user1',
  joinee: 'user2',
};

describe('RoomService', () => {
  let service: RoomService;
  const mockPeopleRepository = {
    create: () => mockJoin,
    save: () => null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockPeopleRepository,
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should join the user to the room', async () => {
    const joined = await service.create(mockJoin);

    expect(joined).toBeDefined();
    expect(joined.id).toBeDefined();
    expect(joined.owner).toBe(mockJoin.owner);
    expect(joined.joinee).toBe(mockJoin.joinee);
  });
});
