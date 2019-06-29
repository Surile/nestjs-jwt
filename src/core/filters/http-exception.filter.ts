import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from '../exception/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();
    if (exception instanceof ApiException) {
      response.status(status).json({
        errorCode: exception.getErrorCode(),
        errorMessage: exception.getErrorMessage(),
        date: new Date().toLocaleDateString(),
        path: request.url,
      });
    } else {
      response.status(statusCode).json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
