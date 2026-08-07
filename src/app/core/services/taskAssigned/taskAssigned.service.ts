import { inject, Injectable, signal } from "@angular/core";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";
import { TaskAssignmentCreateRequest, TaskAssignmentDetail, TaskAssignmentResponse, TaskAssignmentUpdateRequest } from "./taskAssigned.model";
import { TASK_ASSIGN_CREATE, TASK_ASSIGN_GETALL, TASK_ASSIGN_STATUS, TASK_ASSIGN_UPDATE } from "./taskAssigned.route";

@Injectable({providedIn : 'root'})
export class TaskAssignmentService {
    private apiHandler = inject(ApiHandler)
    
    private taskAssignmentSignal = signal<TaskAssignmentResponse[]>([])
    private taskAssignmentDetailSignal = signal<TaskAssignmentDetail | null>(null)
    
    readonly taskAssignments = this.taskAssignmentSignal.asReadonly();
    readonly taskAssignmentDetails = this.taskAssignmentDetailSignal.asReadonly();
    
    getAll() : Observable<ApiResponse<TaskAssignmentResponse[]>> {
        return this.apiHandler.getApi<TaskAssignmentResponse[]>(TASK_ASSIGN_GETALL).pipe(
            tap ((response : ApiResponse<TaskAssignmentResponse[]>) => {
                this.taskAssignmentSignal.set(response.data)
            })
        )
    }

    private refreshGetAll() : void  {
        this.getAll().subscribe({
            next : () => {}
        })
    }

    createTaskAssignment(body : TaskAssignmentCreateRequest) : Observable<ApiResponse<null>> {
        return this.apiHandler.postApi<TaskAssignmentCreateRequest, null>(
            TASK_ASSIGN_CREATE,
            body 
        )
    }

    updateTaskAssignment<TaskAssignmentUpdateRequest>(
        id : number , 
        body : TaskAssignmentUpdateRequest
    ) : Observable<ApiResponse<null>> {
        return this.apiHandler.putApi<TaskAssignmentUpdateRequest, null>(
            `${TASK_ASSIGN_UPDATE}${id}${TASK_ASSIGN_STATUS}`,
            body
        )
    }    
}