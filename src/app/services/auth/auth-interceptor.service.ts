import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  const token = authService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // Se for 403 (token expirado)
      if (error instanceof HttpErrorResponse && error.status === 403) {
        // evita refresh duplo
        if (isRefreshing) {
          return EMPTY;
        }
        isRefreshing = true;

        return authService.refresh().pipe(
          switchMap((response) => {
            const newToken = response.data?.token;

            if (!newToken) {
              isRefreshing = false;
              return throwError(
                () =>
                  new HttpErrorResponse({
                    status: 403,
                    statusText: 'Forbidden',
                    url: req.url,
                    error: 'Refresh token not found',
                  })
              );
            }

            // salva novo token em memória
            authService.setToken(newToken);

            // refaz a requisição original com o novo token
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });

            isRefreshing = false;
            return next(retryReq);
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
