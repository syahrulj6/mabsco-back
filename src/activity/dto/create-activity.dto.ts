import { IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  type: string;

  @IsString()
  message: string;

  @IsString()
  postId: string;

  @IsString()
  userId: string;
}
