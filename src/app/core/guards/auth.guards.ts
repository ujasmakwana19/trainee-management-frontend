import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthApiService } from '../services/auth/auth.service';
import { RoutePath } from '../route.constant';
import { UserRole } from '../services/auth/auth.model';
import { AuthorisePermission } from '../permission.constant';
import { ToasterService } from '../services/toaster/toaster.service';
import { ERROR } from '../message.localizer';

// Checks for the authentication
// if not try to refreshToken 
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);
  const toaster = inject(ToasterService)

  if (authService.isAuthenticated()) {
    return routeGuard(authService, toaster , router, route, state);
  }

  return authService.refreshToken().pipe(
    map(() => routeGuard(authService, toaster, router, route, state)), 
    catchError(() => {
      router.navigate([RoutePath.AUTH], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};

// checks for the authorization
const routeGuard = (
    authService : AuthApiService,
    toaster : ToasterService,
    router : Router,
    route : ActivatedRouteSnapshot , 
    state : RouterStateSnapshot
  ) : boolean | UrlTree => {

    const currentUserRole : UserRole | undefined =  authService.currentUser()?.role; 
    
    if( currentUserRole === undefined){
        toaster.showMessage(ERROR.SESSION_EXPIRED)
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