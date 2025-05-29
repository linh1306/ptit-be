import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import {
  CreateLessonsDto,
  LessonsDto,
  ResMessage,
  ResService,
  UpdateLessonDocumentsDto,
  UpdateLessonMultipleChoicesDto,
  UpdateLessonsDto,
} from '@types';
import { ERR } from '@app/common/config/err.config';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(subjectId: string, body: CreateLessonsDto): ResService {
    const lesson = await this.prisma.lessons.create({
      data: {
        subjectId,
        ...body,
      },
    });

    return { data: lesson };
  }

  async getLessons(query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const lessons = await this.prisma.lessons.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: lessons,
    };
  }

  async getLesson(id: string): ResService {
    const lesson = await this.prisma.lessons.findUnique({
      where: { id },
      include: {
        lessonDocument: true,
        lessonMultipleChoice: true,
      },
    });

    if (!lesson) {
      throw ERR.DATA.LESSON.NOT_FOUND;
    }

    return { data: lesson };
  }

  async update(id: string, body: UpdateLessonsDto): ResService {
    try {
      const lesson = await this.prisma.lessons.update({
        where: { id },
        data: {
          ...body,
        },
      });

      return { data: lesson };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async remove(id: string): ResService {
    try {
      const lesson = await this.prisma.lessons.delete({
        where: { id },
      });

      return {
        data: lesson,
      };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async updateLessonDocument(lessonId: string, body: UpdateLessonDocumentsDto) {
    const updatedDocument = await this.prisma.lessonDocuments.upsert({
      where: { lessonId },
      update: body,
      create: {
        lessonId,
        ...body,
      },
    });

    return {
      message: 'Cập nhật tài liệu thành công',
      data: updatedDocument,
    };
  }

  // Phương thức cập nhật LessonMultipleChoices
  async updateLessonMultipleChoice(
    lessonId: string,
    body: UpdateLessonMultipleChoicesDto,
  ) {
    const updatedMultipleChoice =
      await this.prisma.lessonMultipleChoices.upsert({
        where: { lessonId },
        update: body,
        create: {
          lessonId,
          ...body,
        },
      });

    return {
      message: 'Cập nhật câu hỏi trắc nghiệm thành công',
      data: updatedMultipleChoice,
    };
  }
}
