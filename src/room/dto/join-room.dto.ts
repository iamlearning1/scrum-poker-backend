import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinRoomDto {
  @Field()
  @IsUUID()
  joinee: string;

  @Field()
  @IsUUID()
  owner: string;
}
