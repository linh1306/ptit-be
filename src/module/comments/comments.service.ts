import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ResService } from '@app/common/types/common/res.type';
import { PayloadJwtDto } from '@app/common/types/common/payload-jwt.dto';
import { ERR } from '@app/common/config/err.config';
import { CreateCommentsDto } from '@types';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    postId: string,
    body: CreateCommentsDto,
  ): ResService {
    const comment = await this.prisma.comments.create({
      data: {
        postId,
        userId,
        ...body,
      },
    });

    return {
      data: comment,
    };
  }

  async findByPost(postId: string, pagination: PaginationDto): ResService {
    const { page, pageSize } = pagination;

    const [comments, total] = await Promise.all([
      this.prisma.comments.findMany({
        where: {
          postId,
          commentId: null,
        },
        skip: pageSize * (page - 1),
        take: pageSize,
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.comments.count({
        where: {
          postId,
          commentId: null,
        },
      }),
    ]);

    return {
      data: comments,
      metadata: {
        page,
        pageSize,
        total,
      },
    };
  }

  async remove(user: PayloadJwtDto, id: string): ResService {
    const comment = await this.prisma.comments.delete({
      where: { id, userId: user.id },
    });

    if (!comment) {
      throw ERR.DATA.COMMENT.NOT_FOUND;
    }

    return {
      data: {
        message: 'Xóa Bình luận thành công',
      },
    };
  }
}
