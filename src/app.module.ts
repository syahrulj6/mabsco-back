import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { BioModule } from './bio/bio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostsModule,
    UsersModule,
    DatabaseModule,
    BioModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MyLoggerModule,
    PostsModule,
    GameModule,
    AuthModule,
    BioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
