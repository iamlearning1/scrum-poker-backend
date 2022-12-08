import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { UpdatePointsDto } from './dto/update-points.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';

const pubSub = new PubSub();

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Subscription(() => [Room], {
    name: 'joinedRoom',
  })
  joinedRoom(@Args({ name: 'owner', type: () => String }) owner: string) {
    return pubSub.asyncIterator('joinedRoom');
  }

  @Mutation(() => Room)
  async joinRoom(
    @Args({ name: 'data', type: () => JoinRoomDto }) data: JoinRoomDto,
  ): Promise<Room> {
    const joined = await this.roomService.create(data);
    const people = await this.roomService.findPeopleByRoom(data.owner);

    pubSub.publish('joinedRoom', { joinedRoom: people });
    return joined;
  }

  @Mutation(() => [Room])
  async updatePoints(
    @Args({ name: 'data', type: () => UpdatePointsDto }) data: UpdatePointsDto,
  ) {
    await this.roomService.updatePoints({ id: data.id, points: data.points });

    return this.roomService.findPeopleByRoom(data.owner);
  }

  @Mutation(() => [Room])
  async resetAll(@Args({ name: 'owner', type: () => String }) owner: string) {
    await this.roomService.resetAll(owner);

    return this.roomService.findPeopleByRoom(owner);
  }

  @Mutation(() => [Room])
  async leaveRoom(
    @Args({ name: 'data', type: () => LeaveRoomDto }) data: LeaveRoomDto,
  ) {
    await this.roomService.leaveRoom(data.id);

    return this.roomService.findPeopleByRoom(data.owner);
  }
}
