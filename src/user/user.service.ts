import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ email, firstName, lastName }: CreateUserDto): Promise<User> {
    const room = this.createRoom();

    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      room,
    });

    await this.userRepository.save(user);

    this.logger.log(`User created with id ${user.id} & email ${user.email}`);

    return user;
  }

  createRoom(): string {
    const id: string = uuidv4() as string;

    this.logger.log(`Creating a room id ${id}`);

    return id;
  }
}
