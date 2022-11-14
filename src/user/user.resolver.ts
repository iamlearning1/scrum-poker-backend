import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'data', type: () => CreateUserDto }) data: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(data);
  }
}
