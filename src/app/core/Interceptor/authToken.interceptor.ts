import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthApiService } from "../services/auth/auth.service";

export const authTokenInterceptor : HttpInterceptorFn = (req, next) =>  {
    const authService = inject(AuthApiService)
    const token = authService.accessToken()

    const addedAuthHeader = req.clone({
        setHeaders : {
            Authorization : `Bearer ${token}`
        }
    });

    return next(addedAuthHeader)
}