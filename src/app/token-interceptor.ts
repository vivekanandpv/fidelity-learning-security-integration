import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from './user';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(User);

  if (userService.token()) {
    const requestWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.token()}`,
      },
    });

    return next(requestWithToken);
  } else {
    return next(req);
  }
};
