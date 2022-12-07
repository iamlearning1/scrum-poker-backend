import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IsEmailUniqueConstraint } from './decorators/unique-email.decorator';
import { UserModule } from './user/user.module';
import { PeopleModule } from './people/people.module';
import { User } from './user/user.entity';
import { People } from './people/people.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'poker.sqlite',
      entities: [User, People],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
    PeopleModule,
  ],
  providers: [IsEmailUniqueConstraint],
})
export class AppModule {}
