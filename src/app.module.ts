import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IsEmailUniqueConstraint } from './decorators/unique-email.decorator';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { User } from './user/user.entity';
import { Room } from './room/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: `${configService.get('NODE_ENV')}.sqlite`,
        entities: [User, Room],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
    RoomModule,
  ],
  providers: [IsEmailUniqueConstraint],
})
export class AppModule {}
