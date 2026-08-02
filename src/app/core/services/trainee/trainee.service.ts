import { inject, Injectable, signal } from "@angular/core";
import { TraineeResponse } from "./trainee.model";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { TRAINEE_GETALL } from "./trainee.route";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";

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
    
}