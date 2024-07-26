import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { ProfileController } from './game.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [GameService],
})
export class GameModule {}
