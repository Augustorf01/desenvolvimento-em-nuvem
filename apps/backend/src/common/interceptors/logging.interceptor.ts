import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const { method, url } = request;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now;
                console.log(`${method} ${url} - ${responseTime}ms`);
            }),
        );
    }
}