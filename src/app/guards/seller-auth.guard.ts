import { CanActivateFn, Router } from '@angular/router';

export const sellerAuthGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const isLoggedIn = localStorage.getItem('access_token') === 'true';

  if (!isLoggedIn) {
    router.navigate(['seller-auth']);
    return false;
  }
  return true;
};
