import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, EMPTY, finalize, Observable, of, tap, throwError } from "rxjs";
import { AuthResponse, LoginCredentials, UserInfo } from "./auth.model";
import { uri } from "../constant";
import { LOGIN, LOGOUT, REFRESH } from "./auth.route";
import { ToasterService } from "../toaster/toaster.service";
import { SUCCESS } from "../../message.localizer";

@Injectable({providedIn:'root'})
export class AuthApiService {
    private http = inject(HttpClient)
    private toasterService = inject(ToasterService)

    private accessTokenSignal = signal<string | null>(null)
    private currentUserSignal = signal<UserInfo | null>(null)
    private triedToRefreshFlag = signal<boolean>(false)

    // to get secret token via readonly signal
    readonly accessToken = this.accessTokenSignal.asReadonly();
    readonly currentUser = this.currentUserSignal.asReadonly();
    readonly triedTORefresh = this.triedToRefreshFlag.asReadonly();

    readonly isAuthenticated = computed(() => !!this.accessTokenSignal());

    private setAccessToken (token : string | null) {
        this.accessTokenSignal.set(token)
    }

    private setUser (data : UserInfo | null) {
        this.currentUserSignal.set(data)
    }

    loginUser(body : LoginCredentials) : Observable<AuthResponse> {
        
        return this.http.post<AuthResponse>(
            `${uri}${LOGIN}`, 
            body, 
            { withCredentials: true})
            .pipe
            (
                tap((response : AuthResponse) => {
                    this.setAccessToken(response.data.token)
                    this.setUser(response.data.user)
                    this.toasterService.showMessage(SUCCESS.USER_LOGGED_IN)
                }),
                catchError((errorRes) => {                    
                    this.toasterService.showError(errorRes)
                    return throwError(() => new Error(errorRes.error.message));
                })
            )
    }

    refreshToken(): Observable<AuthResponse> {
        this.triedToRefreshFlag.set(true)
        return this.http.post<AuthResponse>(`${uri}${REFRESH}`, {}, { withCredentials: true })
            .pipe(
            tap((response: AuthResponse) => {
                this.setAccessToken(response.data.token);
                this.setUser(response.data.user);
            })
        );
    }

    logout() : Observable<void>{
        return this.http.post<void>(`${uri}${LOGOUT}`, {}, { withCredentials: true })
            .pipe(
            finalize(() => {
                this.setAccessToken(null);
                this.setUser(null);
                this.toasterService.showMessage(SUCCESS.USER_LOGGED_OUT)
            })
        );
    }
}

