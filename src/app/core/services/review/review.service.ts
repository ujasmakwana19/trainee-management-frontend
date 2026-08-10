import { inject, Injectable, signal } from "@angular/core";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";
import { ReviewCreateRequest, ReviewResponse } from "./review.model";
import { REVIEW_CREATE, REVIEW_GETALL } from "./review.route";

@Injectable({providedIn : 'root'})
export class ReviewService {
    private apiHandler = inject(ApiHandler)
    
    private reviewSignal = signal<ReviewResponse[]>([])
    private reviewSignalDetail = signal<ReviewResponse | null>(null)
    
    readonly reviews = this.reviewSignal.asReadonly();
    readonly reviewDetails = this.reviewSignalDetail.asReadonly();
    
    getAll() : Observable<ApiResponse<ReviewResponse[]>> {
        return this.apiHandler.getApi<ReviewResponse[]>(REVIEW_GETALL).pipe(
            tap ((response : ApiResponse<ReviewResponse[]>) => {
                this.reviewSignal.set(response.data)
            })
        )
    }

    private refreshGetAll() : void  {
        this.getAll().subscribe({
            next : () => {}
        })
    }

    createReview(body : ReviewCreateRequest) : Observable<ApiResponse<null>> {
        return this.apiHandler.postApi<ReviewCreateRequest, null>(
            REVIEW_CREATE,
            body 
        )
    } 
}