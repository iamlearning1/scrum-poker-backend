import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validate(email: string): Promise<boolean> {
    console.log(
      '🚀 ~ file: user-exists.decorator.ts ~ line 20 ~ validate ~ email',
      email,
    );
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(
      '🚀 ~ file: user-exists.decorator.ts ~ line 25 ~ validate ~ user',
      user,
    );

    return !user;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
