import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthResponse, LoginCredentials, UserInfo } from "./auth.model";
import { uri } from "../constant";
import { LOGIN, REFRESH } from "./auth.route";

@Injectable({providedIn:'root'})
export class AuthApiService {
    private http = inject(HttpClient)

    private accessTokenSignal = signal<string | null>(null)
    private currentUserSignal = signal<UserInfo | null>(null)

    // to get secret token via readonly
    readonly accessToken = this.accessTokenSignal.asReadonly();
    readonly currentUser = this.currentUserSignal.asReadonly();

    readonly isAuthenticated = computed(() => !!this.accessTokenSignal());

    setAccessToken (token : string | null) {
        this.accessTokenSignal.set(token)
    }
    setUser (data : UserInfo | null) {
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
    return this.http.post<AuthResponse>(`${uri}${REFRESH}`, {}, { withCredentials: true })
        .pipe(
        tap((response: AuthResponse) => {
            this.setAccessToken(response.data.token);
            this.setUser(response.data.user);
        })
        );
    }
}

