import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinDto {
  @Field()
  @IsUUID()
  joinee: string;

  @Field()
  @IsUUID()
  owner: string;
}
