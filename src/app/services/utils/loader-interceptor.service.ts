import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loader } from './loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(Loader);
  loaderService.show();
  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
