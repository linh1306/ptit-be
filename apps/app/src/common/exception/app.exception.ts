import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { IRes } from '../type/index.type';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('error all', exception);

    const errorResponse: IRes<null> = {
      data: null,
      status: false,
      error: exception.errors,
    };

    response.status(200).json(errorResponse);
  }
}
