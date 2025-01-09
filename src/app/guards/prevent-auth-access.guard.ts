import { CanActivateFn, Router } from '@angular/router';

export const preventAuthAccessGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const isLoggedIn = localStorage.getItem('mySignal') === 'true';

  if (isLoggedIn) {
    router.navigate(['seller-home']);
    return false;
  }
  return true;
};
