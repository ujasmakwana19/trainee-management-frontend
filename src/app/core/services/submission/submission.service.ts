import { inject, Injectable, signal } from "@angular/core";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";
import { SubmissionCreateRequest, SubmissionResponse } from "./submission.model";
import { SUBMISSION_CREATE, SUBMISSION_GETALL } from "./submission.route";

@Injectable({providedIn : 'root'})
export class SubmissionService {
    private apiHandler = inject(ApiHandler)
    
    private submissionSignal = signal<SubmissionResponse[]>([])
    private submissionSignalDetail = signal<SubmissionResponse | null>(null)
    
    readonly submissions = this.submissionSignal.asReadonly();
    readonly submissionsDetails = this.submissionSignalDetail.asReadonly();
    
    getAll() : Observable<ApiResponse<SubmissionResponse[]>> {
        return this.apiHandler.getApi<SubmissionResponse[]>(SUBMISSION_GETALL).pipe(
            tap ((response : ApiResponse<SubmissionResponse[]>) => {
                this.submissionSignal.set(response.data)
            })
        )
    }

    private refreshGetAll() : void  {
        this.getAll().subscribe({
            next : () => {}
        })
    }

    createTaskAssignment(body : SubmissionCreateRequest) : Observable<ApiResponse<null>> {
        return this.apiHandler.postApi<SubmissionCreateRequest, null>(
            SUBMISSION_CREATE,
            body 
        )
    } 
}