import { inject, Injectable, signal } from "@angular/core";
import { MentorCreateRequest, MentorResponse, MentorUpdateRequest } from "./mentor.model";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { MENTOR_CREATE, MENTOR_DELETE, MENTOR_GETALL, MENTOR_UPDATE } from "./mentor.route";
import { ApiResponse } from "../../apiHandler/apiResponse.model";
import { Observable, tap } from "rxjs";

@Injectable({providedIn : 'root'})
export class MentorService {
    private apiHandler = inject(ApiHandler)

    private mentorSignal = signal<MentorResponse[]>([])
    
    readonly mentors = this.mentorSignal.asReadonly();


    private refresh() {
        this.apiHandler.getApi<MentorResponse[]>(MENTOR_GETALL).subscribe({
            next : (response : ApiResponse<MentorResponse[]>) => {
                this.mentorSignal.set(response.data)
            }
        })
    }
    
    getAll() : void {
        this.refresh()
    }

    createMentor(body : MentorCreateRequest) : Observable<ApiResponse<MentorResponse>> {
        return this.apiHandler.postApi<MentorCreateRequest, MentorResponse>(
            MENTOR_CREATE,
            body 
        )
    }

    deleteMentor(id : number) : Observable<ApiResponse<null>> {
        return this.apiHandler.deleteApi<null>(`${MENTOR_DELETE}${id}`).pipe(
            tap(() => this.refresh())
        )
    }

    updateMentor<MentorUpdateRequest>(
        id : number , 
        body : MentorUpdateRequest
    ) : Observable<ApiResponse<MentorResponse>> {
        return this.apiHandler.putApi<MentorUpdateRequest, MentorResponse>(
            `${MENTOR_UPDATE}${id}`,
            body
        ).pipe(
            tap(() => this.refresh())
        )
    }
    
}