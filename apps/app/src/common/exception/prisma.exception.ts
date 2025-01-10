import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EXCEPTIONS_PRISMA } from '../config/exception.config';
import { IRes } from '../type/index.type';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const res: IRes<null> = {
      data: null,
      status: false,
    };

    if (EXCEPTIONS_PRISMA[exception.code]) {
      res.error = EXCEPTIONS_PRISMA[exception.code];
    } else {
      res.error = {
        code: 'P000',
        message: 'database error',
      };
    }

    response.status(200).json(res);
  }
}
