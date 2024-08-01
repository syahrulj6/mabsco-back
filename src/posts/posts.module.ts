import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  imports: [DatabaseModule, ActivityModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
