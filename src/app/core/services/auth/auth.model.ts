export interface AuthResponse {
    success : string,
    errorMessage : string,
    errorCode : number,
    data : {
        token : string,
        expiriesIn : number,
        user : UserInfo
    }
}

export interface UserInfo{
    id : number ,
    username : string,
    email : string,
    role : UserRole
} 

export enum UserRole {
    Admin = 0,
    Mentor = 1,
    Trainee = 2
}

export interface LoginCredentials {
    email : string,
    password : string
}