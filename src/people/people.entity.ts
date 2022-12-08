import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
@Index(['owner', 'joinee'], { unique: true })
export class People {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Field()
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  joinee: User;

  @Field()
  @Column({ default: 0 })
  points: number;
}
