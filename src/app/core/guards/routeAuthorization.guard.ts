import {  CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthApiService } from "../services/auth/auth.service";
import { of } from "rxjs";
import { UserRole } from "../services/auth/auth.model";
import { AuthorisePermission } from "../permission.constant";
import { RoutePath } from "../route.constant";



export const routeGuard: CanActivateFn = (route , state)  => {
    const authService = inject(AuthApiService);
    const router = inject(Router);

    const currentUserRole : UserRole | undefined=  authService.currentUser()?.role; 
    
    if( currentUserRole === undefined){
        return false
    }

    const urlOfRoute = route.url[0].path
    
    if(AuthorisePermission[urlOfRoute].includes(currentUserRole)){
        return true
    }
    else{
        router.navigate(['ram',RoutePath.HOME])
    }

    return false
};


