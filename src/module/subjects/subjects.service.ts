import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import {
  SubjectsDto,
  ResMessage,
  ResService,
  UpdateSubjectsDto,
  CreateSubjectsDto,
  SubjectsEntity,
} from '@types';
import { ERR } from '@app/common/config/err.config';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateSubjectsDto): ResService {
    const subject = await this.prisma.subjects.create({
      data: {
        ...body,
      },
    });

    return { data: subject };
  }

  async getSubjects(query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const [subjects, total] = await Promise.all([
      this.prisma.subjects.findMany({
        where: {},
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.subjects.count({
        where: {},
      }),
    ]);

    return {
      data: subjects,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async getSubject(id: string): ResService {
    const subject = await this.prisma.subjects.findUnique({
      where: { id },
      include: {
        lessons: true,
      },
    });

    return { data: subject };
  }

  async update(id: string, body: UpdateSubjectsDto): ResService {
    try {
      const subject = await this.prisma.subjects.update({
        where: { id },
        data: {
          ...body,
        },
      });

      return { data: subject };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async remove(id: string): ResService {
    try {
      const subject = await this.prisma.subjects.delete({
        where: { id },
      });
      return {
        data: subject,
      };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }
}
