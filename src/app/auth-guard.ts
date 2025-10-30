import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from './user';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(User);
  const router = inject(Router);

  return toObservable(userService.token).pipe(
    map((t) => {
      if (t) {
        return true;
      } else {
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }, // <-- Pass the attempted URL
        });
      }
    })
  );
};
