import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JoinDto } from './dto/join.dto';
import { People } from './people.entity';
import { PeopleService } from './people.service';

@Resolver()
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Query(() => [People])
  peopleByRoom(@Args({ name: 'owner', type: () => String }) owner: string) {
    return this.peopleService.findPeopleByRoom(owner);
  }

  @Mutation(() => [People])
  async joinRoom(
    @Args({ name: 'data', type: () => JoinDto }) data: JoinDto,
  ): Promise<People[]> {
    await this.peopleService.create(data);

    return this.peopleService.findPeopleByRoom(data.owner);
  }
}
