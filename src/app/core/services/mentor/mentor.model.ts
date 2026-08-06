import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface MentorResponse  {
    id : number ,
    firstName : string,
    lastName : string,
    email : string,
    expertise : string,
    status : MentorStatus
}

export enum MentorStatus {
    Active = 0,
    Inactive = 1,
}

export function allowedStatusValidator(control: AbstractControl): ValidationErrors | null {
  const allowedValues = [MentorStatus.Active, MentorStatus.Inactive];
  return allowedValues.includes(control.value) ? null : { invalidStatus: true };
}

export interface MentorCreateRequest {
    firstName : string,
    lastName : string,
    email : string,
    expertise : string,
    password : string,
    status : MentorStatus,
}

export interface MentorUpdateRequest {
    firstName : string,
    lastName : string,
    email : string,
    expertise : string,
    status : MentorStatus,
}