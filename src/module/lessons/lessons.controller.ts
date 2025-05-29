import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateLessonsDto,
  UpdateLessonsDto,
  LessonsEntity,
  UpdateLessonDocumentsDto,
  UpdateLessonMultipleChoicesDto,
  LessonMultipleChoicesEntity,
  LessonDocumentsEntity,
} from '@types';
import { Role } from '@prisma/client';
import { Roles } from '@app/common/guards/roles.guard';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';

@ApiTags('lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('subjects/:subjectId')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Tạo bài học mới',
    param: ['subjectId'],
    response: {
      type: LessonsEntity,
    },
  })
  create(
    @Param('subjectId') subjectId: string,
    @Body() body: CreateLessonsDto,
  ) {
    return this.lessonsService.create(subjectId, body);
  }

  @Get()
  @ApiSwagger({
    summary: 'Lấy tất cả bài học',
    query: PaginationDto,
    response: {
      type: LessonsEntity,
      isArray: true,
    },
  })
  getLessons(@Query() query: PaginationDto) {
    return this.lessonsService.getLessons(query);
  }

  @Get(':id')
  @ApiSwagger({
    summary: 'Lấy bài học theo id',
    param: ['id'],
    response: {
      type: LessonsEntity,
    },
  })
  getLesson(@Param('id') id: string) {
    return this.lessonsService.getLesson(id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Cập nhật bài học',
    param: ['id'],
    response: {
      type: LessonsEntity,
    },
  })
  update(@Param('id') id: string, @Body() body: UpdateLessonsDto) {
    return this.lessonsService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Xóa bài học',
    param: ['id'],
    response: {
      type: LessonsEntity,
    },
  })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }

  // Endpoint để cập nhật LessonDocuments
  @Patch(':lessonId/documents')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Cập nhật tài liệu bài học',
    param: ['lessonId'],
    response: {
      type: LessonDocumentsEntity,
    },
  })
  updateLessonDocument(
    @Param('lessonId') lessonId: string,
    @Body() body: UpdateLessonDocumentsDto,
  ) {
    return this.lessonsService.updateLessonDocument(lessonId, body);
  }

  // Endpoint để cập nhật LessonMultipleChoices
  @Patch(':lessonId/multiple-choices')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Cập nhật câu hỏi trắc nghiệm',
    param: ['lessonId'],
    response: {
      type: LessonMultipleChoicesEntity,
    },
  })
  updateLessonMultipleChoice(
    @Param('lessonId') id: string,
    @Body() body: UpdateLessonMultipleChoicesDto,
  ) {
    return this.lessonsService.updateLessonMultipleChoice(id, body);
  }
}
