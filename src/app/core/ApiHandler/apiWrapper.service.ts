// import { HttpClient } from "@angular/common/http";
// import { inject, Injectable } from "@angular/core";
// import { uri } from "../services/constant";
// import { AuthApiService } from "../services/auth/auth.service";
// import { Router } from "@angular/router";
// import { ApiResponse } from "./apiResponse.model";
// import { catchError, Observable, switchMap } from "rxjs";
// import { AuthResponse } from "../services/auth/auth.model";
// import { RoutePath } from "../route.constant";

// @Injectable({providedIn : 'root'})
// export class ApiHandler {
//     private http = inject(HttpClient)
//     private authService = inject(AuthApiService)
//     private router = inject(Router)

//     private handleFail(message : string): void {
//         console.log(message);
//     }

//     private refreshAccessTokenOnExpiry<T>(stackedMethod : Observable<ApiResponse<T>>) : Observable<ApiResponse<T>> {
//         return this.authService.refreshToken().pipe(
//             switchMap((response : AuthResponse) => {
//                 if(response.success){
//                     return stackedMethod
//                 }
                
//                 this.router.navigate([RoutePath.AUTH])
//             }),
//             catchError((error) => {
//                 this.router.navigate([RoutePath.AUTH])
//             })
//         );
//     }

    

//     // GET API 
//     getApi<T>(pathToHit : string, isRetry = false) : Observable<ApiResponse<T>>{

//         if(!this.authService.isAuthenticated()){
//             return false
//         }

//         return this.http.get<ApiResponse<T>>(`${uri}${pathToHit}`).pipe(
//             switchMap((response : ApiResponse<T>) => {
//                 if(!response.success && response.errorCode === 4555 && !isRetry){
//                     return this.refreshAccessTokenOnExpiry<T>(this.getApi<T>(pathToHit))
//                 }
//             })
//         )
//     }

//     // POST API
//     getPost<T>(){}

//     // PUT API
//     putApi(){}

//     // DELETE API
//     deleteApi(){}
// }