import { InputType, OmitType } from '@nestjs/graphql';
import { UpdatePointsDto } from './update-points.dto';

@InputType()
export class LeaveRoomDto extends OmitType(UpdatePointsDto, [
  'points',
] as const) {}
