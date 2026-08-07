import { inject, Injectable, signal } from "@angular/core";
import { TraineeCreateRequest, TraineeResponse, TraineeUpdateRequest } from "./trainee.model";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { TRAINEE_CREATE, TRAINEE_DELETE, TRAINEE_GETALL, TRAINEE_UPDATE } from "./trainee.route";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";

@Injectable({providedIn : 'root'})
export class TraineeService {
    private apiHandler = inject(ApiHandler)

    private traineesSignal = signal<TraineeResponse[]>([])
    
    readonly trainees = this.traineesSignal.asReadonly();


    refreshGetAll() : void  {
        this.getAll().subscribe({
            next : () => {}
        })
    }
    
    getAll() : Observable<ApiResponse<TraineeResponse[]>> {
        return this.apiHandler.getApi<TraineeResponse[]>(TRAINEE_GETALL).pipe(
            tap ((response : ApiResponse<TraineeResponse[]>) => {
                this.traineesSignal.set(response.data)
            })
        )
    }

    createTrainee(body : TraineeCreateRequest) : Observable<ApiResponse<TraineeResponse>> {
        return this.apiHandler.postApi<TraineeCreateRequest, TraineeResponse>(
            TRAINEE_CREATE,
            body 
        )
    }

    deleteTrainee(id : number) : Observable<ApiResponse<null>> {
        return this.apiHandler.deleteApi<null>(`${TRAINEE_DELETE}${id}`).pipe(
            tap(() => this.refreshGetAll())
        )
    }

    updateTrainee<TraineeUpdateRequest>(
        id : number , 
        body : TraineeUpdateRequest
    ) : Observable<ApiResponse<TraineeResponse>> {
        return this.apiHandler.putApi<TraineeUpdateRequest, TraineeResponse>(
            `${TRAINEE_UPDATE}${id}`,
            body
        )
    }
    
}