import { IRes } from './../type/index.type';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IRes<any>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IRes<any>> {
    const request: ExpressRequest = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const res: IRes<any> = {
          status: true,
          data,
          metadata: request.metadata,
        };
        return res;
      }),
    );
  }
}
