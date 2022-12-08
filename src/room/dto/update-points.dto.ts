import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, Max } from 'class-validator';

@InputType()
export class UpdatePointsDto {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsUUID()
  owner: string;

  @Field()
  @IsInt()
  @Min(0)
  @Max(13)
  points: number;
}
