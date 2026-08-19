import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Normalizes backend errors into a consistent, human-readable message so
 * feature components can surface a single `error` string in their state.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.status === 0
          ? 'Unable to reach the Digital Universe API. Is the server running?'
          : (error.error?.message ?? `Request failed with status ${error.status}.`);

      return throwError(() => new Error(message));
    })
  );
