import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface TaskResponse  {
    id : number ,
    title : string,
    description : string,
    expectedTechStack : string,
    dueDate : string,
    status : TaskStatus
}

export enum TaskStatus {
    Draft = 0,
    Published = 1,
    Closed = 2
}

export function allowedStatusValidator(control: AbstractControl): ValidationErrors | null {
  const allowedValues = [TaskStatus.Draft, TaskStatus.Published, TaskStatus.Closed];
  return allowedValues.includes(control.value) ? null : { invalidStatus: true };
}

export interface TaskCreateRequest {
    title : string,
    description : string,
    expectedTechStack : string,
    dueDate : string,
    status : TaskStatus,
}

export interface TaskUpdateRequest {
    title : string,
    description : string,
    expectedTechStack : string,
    dueDate : string,
    status : TaskStatus,
}