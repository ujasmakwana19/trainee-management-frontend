import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface ReviewResponse {
    id : number,
    submissionId : number,
    submission : string,
    submissionUrl : string,
    mentorId : number,
    mentor : string,
    feedback : string
    score : number,
    reviewStatus : ReviewStatus
    reviewedDate : string,
}

export enum ReviewStatus {
    Accepted = 0,
    ChangesRequired = 1,
    Rejected = 2
}

export function allowedStatusValidator(control: AbstractControl): ValidationErrors | null {
  const allowedValues = [
    ReviewStatus.Accepted, 
    ReviewStatus.ChangesRequired,
    ReviewStatus.Rejected,
];
  return allowedValues.includes(control.value) ? null : { invalidStatus: true };
}

export interface ReviewCreateRequest {
    submissionId : number,
    mentorId : number,
    feedback : string,
    score : number,
    reviewStatus : ReviewStatus,
    reviewedDate : string,
}