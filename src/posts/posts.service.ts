import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly activityService: ActivityService,
  ) {}

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
    // Delete associated comments
    await this.databaseService.comment.deleteMany({
      where: { postId: id },
    });

    // Delete the post
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

    const newComment = await this.databaseService.comment.create({
      data: {
        content: trimmedContent,
        post: { connect: { id: postId } },
        author: { connect: { id: createCommentDto.authorId } },
      },
    });

    // Get the post information including the author
    const post = await this.databaseService.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    // Get the comment author information
    const commentAuthor = await this.databaseService.user.findUnique({
      where: { id: createCommentDto.authorId },
      select: { name: true },
    });

    if (post && commentAuthor) {
      await this.activityService.create({
        userId: post.authorId,
        postId: postId,
        type: 'COMMENT',
        message: `${commentAuthor.name} mengomentari postingan anda`,
      });
    }

    return newComment;
  }

  async deleteComment(commentId: string) {
    return this.databaseService.comment.delete({
      where: { id: commentId },
    });
  }
}
