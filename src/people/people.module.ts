import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleService } from './people.service';
import { PeopleResolver } from './people.resolver';
import { People } from './people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  providers: [PeopleService, PeopleResolver],
})
export class PeopleModule {}
