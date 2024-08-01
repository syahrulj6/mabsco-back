import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { CreateCommentDto } from './dto/createCommentDto';

@SkipThrottle()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  private readonly logger = new MyLoggerService(PostsController.name);

  @Post()
  create(@Body() createPostDto: Prisma.PostCreateInput) {
    return this.postsService.create(createPostDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string) {
    this.logger.log(`Request for all Posts\t${ip}`);
    return this.postsService.findAll();
  }

  @Get('author/:authorId')
  async getPostsByAuthorId(@Param('authorId') authorId: string) {
    return this.postsService.findAllByAuthorId(authorId);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Get(':id/comments')
  async getCommentsByPostId(@Param('id') postId: string) {
    return this.postsService.getCommentsByPostId(postId);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.addComment(postId, createCommentDto);
  }

  @Delete('comments/:commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.postsService.deleteComment(commentId);
  }
}
