import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  console.log(route);
  console.log(state);
  
  
  const router = inject(Router);
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('access_token');
  let paresedUser = null;
  
  if(user){
    paresedUser= JSON.parse(user)
  }

  if(!token || !paresedUser){
    router.navigate(['auth/login'])
    return false;
  }
  
  return true;
};
