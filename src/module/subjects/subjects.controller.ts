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
import { SubjectsService } from './subjects.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateSubjectsDto,
  UpdateSubjectsDto,
  SubjectsEntity,
  ResMessage,
} from '@types';
import { Roles } from '@app/common/guards/roles.guard';
import { Role } from '@prisma/client';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';

@ApiTags('subjects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Tạo môn học mới',
    response: {
      type: SubjectsEntity,
    },
  })
  create(@Body() body: CreateSubjectsDto) {
    return this.subjectsService.create(body);
  }

  @Get()
  @ApiSwagger({
    summary: 'Lấy tất cả môn học với phân trang',
    query: PaginationDto,
    response: {
      type: SubjectsEntity,
      isArray: true,
    },
  })
  getSubjects(@Query() query: PaginationDto) {
    return this.subjectsService.getSubjects(query);
  }

  @Get(':id')
  @ApiSwagger({
    summary: 'Lấy môn học theo ID',
    param: ['id'],
    response: {
      type: SubjectsEntity,
    },
  })
  getSubject(@Param('id') id: string) {
    return this.subjectsService.getSubject(id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Cập nhật môn học',
    param: ['id'],
    response: {
      type: SubjectsEntity,
    },
  })
  update(@Param('id') id: string, @Body() body: UpdateSubjectsDto) {
    return this.subjectsService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Xóa môn học',
    param: ['id'],
    response: {
      type: SubjectsEntity,
    },
  })
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
