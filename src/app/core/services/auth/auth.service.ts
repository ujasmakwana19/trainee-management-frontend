import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, finalize, Observable, of, tap } from "rxjs";
import { AuthResponse, LoginCredentials, UserInfo } from "./auth.model";
import { uri } from "../constant";
import { LOGIN, LOGOUT, REFRESH } from "./auth.route";

@Injectable({providedIn:'root'})
export class AuthApiService {
    private http = inject(HttpClient)

    private accessTokenSignal = signal<string | null>(null)
    private currentUserSignal = signal<UserInfo | null>(null)
    private triedToRefreshFlag = signal<boolean>(false)

    // to get secret token via readonly signal
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
            })
        );
    }
}

