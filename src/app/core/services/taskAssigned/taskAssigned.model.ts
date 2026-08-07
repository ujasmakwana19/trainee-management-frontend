import { AbstractControl, ValidationErrors } from "@angular/forms";
import { MentorResponse } from "../mentor/mentor.model"
import { TaskResponse } from "../task/task.model"
import { TraineeResponse } from "../trainee/trainee.model"

export interface TaskAssignmentResponse {
    id : number,
    traineeId : number,
    traineeName : string,
    mentorId : number,
    mentorName : string,
    learningTaskId : number,
    taskTitle : string,
    assignedDate : string,
    dueDate : string,
    status : TaskAssignmentStatus,
    remark : string
}

export enum TaskAssignmentStatus {
    Assigned = 0,
    Inprogess = 1,
    Submitted = 2,
    Reviewed = 3,
    Completed = 4
}

export function allowedStatusValidator(control: AbstractControl): ValidationErrors | null {
  const allowedValues = [
    TaskAssignmentStatus.Assigned, 
    TaskAssignmentStatus.Inprogess,
    TaskAssignmentStatus.Submitted,
    TaskAssignmentStatus.Reviewed,
    TaskAssignmentStatus.Completed,

];
  return allowedValues.includes(control.value) ? null : { invalidStatus: true };
}

export interface TaskAssignmentDetail {
    id : number,
    trainee : TraineeResponse,
    mentor : MentorResponse,
    task : TaskResponse,
    assignedDate : string,
    dueDate : string,
    status : TaskAssignmentStatus,
    remark : string

}

export interface TaskAssignmentCreateRequest {
    traineeId: number,
    mentorId: number,
    learningTaskId: number,
    assignedDate: string,
    dueDate: string,
    status: TaskAssignmentStatus,
    remark: string
}

export interface TaskAssignmentUpdateRequest {
    status: TaskAssignmentStatus,
}