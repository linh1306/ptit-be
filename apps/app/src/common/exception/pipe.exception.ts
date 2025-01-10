import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { IRes } from '../type/index.type';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class PipeException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        errors,
        message: 'PipeException',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

@Catch(PipeException)
export class PipeExceptionFilter implements ExceptionFilter {
  catch(exception: PipeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as {
      errors: ValidationError[];
      message: string;
    };

    const errors: string[] = [];

    exceptionResponse.errors.forEach((error) => {
      errors.push(...Object.values(error.constraints));
    });

    const res: IRes<null> = {
      error: { code: 'V001', message: 'validate', field: errors },
      status: false,
      data: null,
    };

    response.status(200).json(res);
  }
}
