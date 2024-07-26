import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from './dto/createCommentDto';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPostDto: Prisma.PostCreateInput) {
    const trimmedTitle = createPostDto.title.toString().trim();

    if (!trimmedTitle) throw new BadRequestException('Title cannot be empty.');

    const newPost: Prisma.PostCreateInput = {
      title: trimmedTitle,
      ...createPostDto,
    };

    return this.databaseService.post.create({
      data: newPost,
    });
  }

  async findAll() {
    return this.databaseService.post.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  async findAllByAuthorId(authorId: string) {
    return this.databaseService.post.findMany({
      where: {
        authorId,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId?: string) {
    const post = await this.databaseService.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return {
      ...post,
    };
  }

  async update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    const trimmedTitle = updatePostDto.title.toString().trim();

    if (!trimmedTitle) throw new BadRequestException('Title cannot be empty.');

    const updatedPost: Prisma.PostUpdateInput = {
      title: trimmedTitle,
      ...updatePostDto,
    };

    return this.databaseService.post.update({
      where: { id },
      data: updatedPost,
    });
  }

  async remove(id: string) {
    return this.databaseService.post.delete({
      where: { id },
    });
  }

  async getCommentsByPostId(postId: string) {
    return this.databaseService.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
      },
    });
  }

  async addComment(postId: string, createCommentDto: CreateCommentDto) {
    const trimmedContent = createCommentDto.content.toString().trim();

    if (!trimmedContent)
      throw new BadRequestException('Comment cannot be empty.');

    const newComment: Prisma.CommentCreateInput = {
      content: trimmedContent,
      post: {
        connect: { id: postId },
      },
      author: {
        connect: { id: createCommentDto.authorId },
      },
    };

    return this.databaseService.comment.create({
      data: newComment,
    });
  }

  async deleteComment(commentId: string) {
    return this.databaseService.comment.delete({
      where: { id: commentId },
    });
  }
}
