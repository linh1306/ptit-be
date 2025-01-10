import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../libs/prisma/src/prisma.service';
import { GetUserDto } from '../common/type/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(param: GetUserDto): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: param.query, mode: 'insensitive' } },
          { code: param.query },
        ],
      },
      take: param.pageSize,
      skip: (param.page - 1) * param.pageSize,
    });
  }
}
