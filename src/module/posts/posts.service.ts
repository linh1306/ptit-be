import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import {
  CreatePostsDto,
  PostsDto,
  ResMessage,
  ResService,
  UpdatePostsDto,
} from '@types';
import { ERR } from '@app/common/config/err.config';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostsDto): ResService {
    const post = await this.prisma.posts.create({
      data: {
        ...createPostDto,
        userId,
      },
    });

    return { data: post };
  }

  async getPosts(userId: string, query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              code: true,
              urlAvatar: true,
            },
          },
          _count: {
            select: {
              comments: true,
              postLikes: true,
            },
          },
          postLikes: {
            where: {
              userId: userId,
            },
            select: {
              userId: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.posts.count(),
    ]);

    return {
      data: posts,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async getPost(id: string): ResService {
    const post = await this.prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            code: true,
            urlAvatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            postLikes: true,
          },
        },
      },
    });

    if (!post) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }

    return { data: post };
  }

  async update(userId: string, id: string, body: UpdatePostsDto): ResService {
    try {
      const post = await this.prisma.posts.update({
        where: { id, userId },
        data: {
          ...body,
        },
      });

      return { data: post };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async remove(userId: string, id: string): ResService {
    try {
      const post = await this.prisma.posts.delete({
        where: { id, userId },
      });

      return {
        data: post,
      };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async likePost(userId: string, postId: string): ResService {
    try {
      const postLike = await this.prisma.postLikes.create({
        data: {
          userId,
          postId,
        },
      });

      return {
        data: postLike,
      };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async unlikePost(userId: string, postId: string): ResService {
    try {
      const postLike = await this.prisma.postLikes.delete({
        where: {
          postId_userId: {
            userId,
            postId,
          },
        },
      });

      return {
        data: postLike,
      };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }
}
