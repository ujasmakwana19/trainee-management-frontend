export interface TraineeResponse  {
    id : number ,
    firstName : string,
    lastName : string,
    email : string,
    techStack : string,
    status : TraineeStatus

}

export enum TraineeStatus {
    Active = 0,
    Inactive = 1,
    Completed = 2
}