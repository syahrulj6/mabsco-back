import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const trimmedName = createUserDto.name.toString().trim();

    const user = await this.databaseService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) throw new ConflictException('email duplicated');

    if (!trimmedName) throw new BadRequestException('Name cannot be empty.');

    const newUser = await this.databaseService.user.create({
      data: {
        ...createUserDto,
        name: trimmedName,
        password: await hash(createUserDto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({
      include: {
        posts: true,
        game: true,
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
        game: true,
      },
    });
  }

  async findByName(name: string) {
    return this.databaseService.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', // case-insensitive search
        },
      },
      include: {
        posts: true,
        game: true,
      },
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const updatedUser = {
      ...updateUserDto,
    };

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
