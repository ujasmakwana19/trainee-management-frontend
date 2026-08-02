export interface ApiResponse<T> {
    success : boolean,
    message : string
    errorCode : number,
    data : T
}