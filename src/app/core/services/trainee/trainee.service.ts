import { inject, Injectable, signal } from "@angular/core";
import { TraineeRequest, TraineeResponse } from "./trainee.model";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { TRAINEE_CREATE, TRAINEE_GETALL } from "./trainee.route";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";
import { RoutePath } from "../../route.constant";

@Injectable({providedIn : 'root'})
export class TraineeService {
    private apiHandler = inject(ApiHandler)

    private traineesSignal = signal<TraineeResponse[]>([])
    
    readonly trainees = this.traineesSignal.asReadonly();


    private refresh() {
        this.apiHandler.getApi<TraineeResponse[]>(TRAINEE_GETALL).subscribe({
            next : (response : ApiResponse<TraineeResponse[]>) => {
                this.traineesSignal.set(response.data)
            }
        })
    }
    
    getAll() : void {
        this.refresh()
    }

    createTrainee(body : TraineeRequest) : Observable<ApiResponse<TraineeResponse>> {
        return this.apiHandler.postApi<TraineeRequest, TraineeResponse>(
            TRAINEE_CREATE,
            body 
        ).pipe(
            tap(() => this.refresh())
        )
    }
    
}