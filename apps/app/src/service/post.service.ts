import { Injectable } from '@nestjs/common';
import { ReqConfig } from '../common/type/index.type';
import { PrismaService } from '@app/prisma';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(req: ReqConfig): Promise<Post[]> {
    const userId = req.user.id;
    return await this.prisma.post.findMany({});
  }
}
