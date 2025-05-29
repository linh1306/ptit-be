import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { UsersDto, ResService, UpdateUsersDto, PayloadJwtDto } from '@types';
import { ERR } from '@app/common/config/err.config';
import { UpdateUserRoleStatusDto } from './dto/update-user-role-status.dto';
import { SearchUsersDto } from './dto/getUsers.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(query: SearchUsersDto): ResService {
    const { page, pageSize, search } = query;

    const [users, total] = await Promise.all([
      this.prisma.users.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.users.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      data: users,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async getUser(id: string): ResService {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }

    return { data: user };
  }

  async getProfile({ id }: PayloadJwtDto): ResService {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) throw ERR.DATA.USER.NOT_FOUND;

    return {
      data: user,
    };
  }

  async update(userId: string, body: UpdateUsersDto): ResService {
    try {
      const user = await this.prisma.users.update({
        where: { id: userId },
        data: body,
      });

      return { data: user };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async updateRoleAndStatus(
    userId: string,
    user: PayloadJwtDto,
    body: UpdateUserRoleStatusDto,
  ): ResService {
    try {
      if (body.role === 'superAdmin' && user.role !== 'superAdmin') {
        throw ERR.DATA.COMMON.NOT_ALLOWED;
      }
      const userUpdate = await this.prisma.users.update({
        where: { id: userId },
        data: body,
      });

      return { data: userUpdate };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }
}
