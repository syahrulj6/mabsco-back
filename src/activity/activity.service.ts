import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createActivityDto: CreateActivityDto) {
    return this.databaseService.activity.create({
      data: createActivityDto,
    });
  }

  async findAll() {
    return this.databaseService.activity.findMany({
      include: {
        post: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.activity.findUnique({
      where: { id },
      include: {
        post: true,
        user: true,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return this.databaseService.activity.findMany({
      where: { userId },
      include: {
        post: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    return this.databaseService.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.activity.delete({
      where: { id },
    });
  }
}
