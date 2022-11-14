import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { IsUserAlreadyExist } from '../../decorators/user-exists.decorator';

@InputType()
export class CreateUserDto {
  @Field()
  //   @IsUserAlreadyExist({ message: 'User already exists' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;
}
