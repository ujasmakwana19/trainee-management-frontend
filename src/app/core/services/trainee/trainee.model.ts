import { AbstractControl, ValidationErrors } from "@angular/forms";

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
}

export function allowedStatusValidator(control: AbstractControl): ValidationErrors | null {
  const allowedValues = [TraineeStatus.Active, TraineeStatus.Inactive];
  return allowedValues.includes(control.value) ? null : { invalidStatus: true };
}

export interface TraineeRequest {
    firstName : string,
    lastName : string,
    email : string,
    techStack : string,
    password : string,
    status : TraineeStatus,
}