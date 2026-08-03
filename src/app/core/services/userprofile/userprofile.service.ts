import { inject, Injectable, signal } from "@angular/core";
import { UserProfileResponse } from "./userprofile.model";
import { ApiHandler } from "../../apiHandler/apiWrapper.service";
import { USER_PROFILE_VIEW } from "./userprofile.route";
import { ApiResponse } from "../../apiHandler/apiResponse.model";

@Injectable({providedIn : 'root'})
export class UserProfileService {
    private apiHandler = inject(ApiHandler)

    private userProfileState = signal<UserProfileResponse | null>(null)

    readonly userProfile = this.userProfileState.asReadonly()

    getProfile() : void {
        this.apiHandler.getApi<UserProfileResponse>(USER_PROFILE_VIEW).subscribe({
            next : (response : ApiResponse<UserProfileResponse>) => {
                this.userProfileState.set(response.data)
            }
        })
    }

}