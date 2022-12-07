import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinDto } from './dto/join.dto';
import { People } from './people.entity';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    @InjectRepository(People) private peopleRepository: Repository<People>,
  ) {}

  async create({ joinee, owner }: JoinDto) {
    const joined = this.peopleRepository.create({
      // @ts-ignore
      joinee,
      owner,
    });

    await this.peopleRepository.save(joined);

    this.logger.log(`User ${joinee} joined room ${owner} with id ${joined.id}`);

    return joined;
  }

  findPeopleByRoom(owner: string) {
    this.logger.log(`Finding all people who joined the room ${owner}`);

    return this.peopleRepository.find({
      // @ts-ignore
      owner,
      relations: {
        joinee: true,
        owner: true,
      },
    });
  }
}
