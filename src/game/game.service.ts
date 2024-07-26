import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GameService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(creategameDto: Prisma.GameCreateInput) {
    const newgame = {
      ...creategameDto,
    };

    return this.databaseService.game.create({
      data: newgame,
    });
  }

  async findAll() {
    return this.databaseService.game.findMany();
  }

  async findByUserId(userId: string) {
    return this.databaseService.game.findMany({
      where: {
        userId,
      },
    });
  }
  async update(id: string, updateGameDto: Prisma.GameUpdateInput) {
    const updatedGame = {
      ...updateGameDto,
    };

    return this.databaseService.game.update({
      where: {
        id,
      },
      data: updatedGame,
    });
  }

  async remove(id: string) {
    return this.databaseService.game.delete({
      where: {
        id,
      },
    });
  }
}
