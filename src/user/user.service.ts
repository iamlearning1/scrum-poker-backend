import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ email, firstName, lastName }: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
    });

    await this.userRepository.save(user);

    this.logger.log(`User created with id ${user.id} & email ${user.email}`);

    return user;
  }
}
