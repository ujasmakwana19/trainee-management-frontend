import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthApiService } from '../services/auth/auth.service';
import { RoutePath } from '../route.constant';
import { UserRole } from '../services/auth/auth.model';
import { AuthorisePermission } from '../permission.constant';

// Checks for the authentication
// if not try to refreshToken 
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return routeGuard(authService, router, route, state);
  }

  return authService.refreshToken().pipe(
    map(() => routeGuard(authService, router, route, state)), 
    catchError(() => {
      router.navigate([RoutePath.AUTH], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};

// checks for the authorization
const routeGuard = (
    authService : AuthApiService,
    router : Router,
    route : ActivatedRouteSnapshot , 
    state : RouterStateSnapshot
  ) : boolean | UrlTree => {

    const currentUserRole : UserRole | undefined =  authService.currentUser()?.role; 
    
    if( currentUserRole === undefined){
        return router.createUrlTree([RoutePath.AUTH])
    }
    
    const urlOfRoute = route.url[0].path

    if(
        AuthorisePermission[urlOfRoute].length === 0 || 
        AuthorisePermission[urlOfRoute].includes(currentUserRole)
    ){
        return true
    }

    return router.createUrlTree([RoutePath.HOME])
};