import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePointsDto } from './dto/update-points.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async create({ joinee, owner }: JoinRoomDto) {
    const joined = this.roomRepository.create({
      // @ts-ignore
      joinee,
      owner,
    });

    await this.roomRepository.save(joined);

    this.logger.log(`User ${joinee} joined room ${owner} with id ${joined.id}`);

    return this.roomRepository.findOneBy({ id: joined.id });
  }

  findPeopleByRoom(owner: string) {
    this.logger.log(`Finding all people who joined the room ${owner}`);

    return this.roomRepository.find({
      // @ts-ignore
      owner,
    });
  }

  updatePoints({ id, points }: Omit<UpdatePointsDto, 'owner'>) {
    this.logger.log(`Adding points ${points} to room ${id}`);

    return this.roomRepository.update({ id }, { points });
  }

  resetAll(owner: string) {
    this.logger.log(`Adding points for room with owner ${owner}`);

    // @ts-ignore
    return this.roomRepository.update({ owner }, { points: 0 });
  }

  leaveRoom(id: string) {
    this.logger.log(`Remove this record ${id} from rooms`);

    return this.roomRepository.delete({ id });
  }
}
