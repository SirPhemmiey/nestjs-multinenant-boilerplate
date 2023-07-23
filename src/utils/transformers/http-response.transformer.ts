import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface HttpResponse<T> {
  data: T;
}

@Injectable()
export class HttpTransformInterceptor<T>
  implements NestInterceptor<T, HttpResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const cleanData = {
          ...data,
        };
        delete cleanData.statusCode;
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: cleanData,
        };
      }),
    );
  }
}
