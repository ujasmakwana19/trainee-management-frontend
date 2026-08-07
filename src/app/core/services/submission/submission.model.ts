import { AbstractControl, ValidationErrors } from "@angular/forms";
import { MentorResponse } from "../mentor/mentor.model"
import { TaskResponse } from "../task/task.model"
import { TraineeResponse } from "../trainee/trainee.model"

export interface SubmissionResponse {
    id : number,
    taskAssignmentId : number,
    taskAssignmentTitle : string,
    submissionUrl : string,
    notes : string
    submittedDate : string,
    status : SubmissionStatus,
}

export enum SubmissionStatus {
    Submitted = 0,
    ReSubmitted = 1
}

export function allowedStatusValidator(control: AbstractControl): ValidationErrors | null {
  const allowedValues = [
    SubmissionStatus.Submitted, 
    SubmissionStatus.ReSubmitted,
];
  return allowedValues.includes(control.value) ? null : { invalidStatus: true };
}

export interface SubmissionCreateRequest {
    taskAssignmentId : number,
    submissionUrl : string,
    notes : string
    submittedDate : string,
    status : SubmissionStatus,
}