import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { uri } from "../services/constant";
import { AuthApiService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { ApiResponse } from "./apiResponse.model";
import { catchError, EMPTY, finalize, Observable, of, switchMap, tap } from "rxjs";
import { AuthResponse } from "../services/auth/auth.model";
import { RoutePath } from "../route.constant";
import { ToasterService } from "../services/toaster/toaster.service";
import { ERROR } from "../message.localizer";
import { LoaderService } from "../services/loader/loader.service";

@Injectable({providedIn : 'root'})
export class ApiHandler {
    private http = inject(HttpClient)
    private authService = inject(AuthApiService)
    private router = inject(Router)
    private toaster = inject(ToasterService)
    private loader = inject(LoaderService)

    private refreshAccessTokenOnExpiry<T>(stackedMethod : Observable<ApiResponse<T>>) : Observable<ApiResponse<T>> {

        return this.authService.refreshToken().pipe(
            switchMap((response : AuthResponse) => {
                if(response.success){
                    return stackedMethod
                }
                this.router.navigate([RoutePath.AUTH])
                return EMPTY
            }),
            catchError((errorResponse) => {
                this.router.navigate([RoutePath.AUTH])
                this.toaster.showError(errorResponse)
                return EMPTY
            }),
            finalize(() => this.loader.hide())
        );
    }

    

    // GET API 
    getApi<T>(pathToHit : string, isRetry = false) : Observable<ApiResponse<T>>{

        if(!this.authService.isAuthenticated()){
            this.router.navigate([RoutePath.AUTH])
            this.toaster.showMessage(ERROR.SESSION_EXPIRED);
            return EMPTY
        }

        this.loader.show()

        return this.http.get<ApiResponse<T>>(`${uri}${pathToHit}`).pipe(
            switchMap((response : ApiResponse<T>) => {
                return of(response)
            }),
            catchError((errorResponse) => {
                if(!errorResponse.error.success && errorResponse.error.errorCode === 4555 && !isRetry){
                    return this.refreshAccessTokenOnExpiry<T>(this.getApi<T>(pathToHit, true))
                }
                this.toaster.showError(errorResponse)
                return EMPTY
            }),
            finalize(() => this.loader.hide())
        )
    }

    // POST API
    postApi<TRequest, TResponse>(pathToHit : string, body : TRequest, isRetry : boolean = false) : Observable<ApiResponse<TResponse>>{
        if(!this.authService.isAuthenticated()){
            this.router.navigate([RoutePath.AUTH])
            this.toaster.showMessage(ERROR.SESSION_EXPIRED);
            return EMPTY
        }

        this.loader.show()

        return this.http.post<ApiResponse<TResponse>>(
            `${uri}${pathToHit}`, 
            body,
            {withCredentials: false}
        ).pipe(
            switchMap((response : ApiResponse<TResponse>) => {
                return of(response)
            }),
            catchError((errorResponse) => {
                if(!errorResponse.error.success && errorResponse.error.errorCode === 4555 && !isRetry){
                    return this.refreshAccessTokenOnExpiry<TResponse>(this.postApi<TRequest, TResponse>(pathToHit, body, true))
                }
                this.toaster.showError(errorResponse)
                return EMPTY
            }),
            finalize(() => this.loader.hide())
        )
    }

    // PUT API
    putApi(){}

    // DELETE API
    deleteApi(){}
}