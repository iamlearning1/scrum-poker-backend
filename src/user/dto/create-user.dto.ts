import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { IsEmailUnique } from '../../decorators/unique-email.decorator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmailUnique({ message: 'User already exists' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;
}
