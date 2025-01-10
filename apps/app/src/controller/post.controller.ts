import { Controller, Get, Request } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Post } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPost(@Request() req: ExpressRequest): Promise<Post[]> {
    return await this.postService.getPosts(req);
  }
}
