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
    role : number
} 

export enum UserRole {
    Admin,
    Mentor,
    Trainee
}

export interface LoginCredentials {
    email : string,
    password : string
}