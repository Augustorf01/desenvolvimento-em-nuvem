import {
  HttpException,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    // #region agent log
    fetch('http://127.0.0.1:7890/ingest/c6f060d4-fb1c-4069-a550-97cd61fdfc90', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ae8287' },
      body: JSON.stringify({
        sessionId: 'ae8287',
        location: 'logging.interceptor.ts:intercept',
        message: 'intercept_entry',
        data: { hypothesisId: 'H1', method, url },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const duration = Date.now() - now;
          // #region agent log
          fetch('http://127.0.0.1:7890/ingest/c6f060d4-fb1c-4069-a550-97cd61fdfc90', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ae8287' },
            body: JSON.stringify({
              sessionId: 'ae8287',
              location: 'logging.interceptor.ts:tap_next',
              message: 'response_success_path',
              data: {
                hypothesisId: 'H2',
                method,
                url,
                statusCode,
                durationMs: duration,
              },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion
          this.logger.log(`${method} ${url} - Status: ${statusCode} - ${duration}ms`);
        },
        error: (err: unknown) => {
          const duration = Date.now() - now;
          const name = err instanceof Error ? err.name : 'unknown';
          const statusCode =
            err instanceof HttpException ? err.getStatus() : 'error';
          const detail = err instanceof Error ? err.message : String(err);
          this.logger.error(
            `${method} ${url} - Status: ${statusCode} - ${duration}ms - ${detail}`,
          );
          // #region agent log
          fetch('http://127.0.0.1:7890/ingest/c6f060d4-fb1c-4069-a550-97cd61fdfc90', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ae8287' },
            body: JSON.stringify({
              sessionId: 'ae8287',
              location: 'logging.interceptor.ts:tap_error',
              message: 'response_error_path',
              data: {
                hypothesisId: 'H3_H4',
                runId: 'post-fix',
                method,
                url,
                durationMs: duration,
                errorName: name,
                statusCode,
                nestLoggerErrorEmitted: true,
              },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion
        },
      }),
    );
  }
}