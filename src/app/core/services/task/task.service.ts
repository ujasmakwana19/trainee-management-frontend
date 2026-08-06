import { inject, Injectable, signal } from "@angular/core";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";
import { TaskCreateRequest, TaskResponse } from "./task.model";
import { TASK_CREATE, TASK_DELETE, TASK_GETALL, TASK_UPDATE } from "./task.route";

@Injectable({providedIn : 'root'})
export class TaskService {
    private apiHandler = inject(ApiHandler)

    private taskSignal = signal<TaskResponse[]>([])
    
    readonly tasks = this.taskSignal.asReadonly();


    private refresh() {
        this.apiHandler.getApi<TaskResponse[]>(TASK_GETALL).subscribe({
            next : (response : ApiResponse<TaskResponse[]>) => {
                this.taskSignal.set(response.data)
            }
        })
    }
    
    getAll() : void {
        this.refresh()
    }

    createTask(body : TaskCreateRequest) : Observable<ApiResponse<TaskResponse>> {
        return this.apiHandler.postApi<TaskCreateRequest, TaskResponse>(
            TASK_CREATE,
            body 
        )
    }

    deleteTask(id : number) : Observable<ApiResponse<null>> {
        return this.apiHandler.deleteApi<null>(`${TASK_DELETE}${id}`).pipe(
            tap(() => this.refresh())
        )
    }

    updateTask<TaskUpdateRequest>(
        id : number , 
        body : TaskUpdateRequest
    ) : Observable<ApiResponse<TaskResponse>> {
        return this.apiHandler.putApi<TaskUpdateRequest, TaskResponse>(
            `${TASK_UPDATE}${id}`,
            body
        ).pipe(
            tap(() => this.refresh())
        )
    }
    
}