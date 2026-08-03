import { Component, inject } from "@angular/core";
import { UserProfileService } from "../../core/services/userprofile/userprofile.service";

@Component({
    selector : `app-userprofile-view`,
    standalone : true,
    imports : [],
    template : `
        {{userProfileService.userProfile()?.id}}
        {{userProfileService.userProfile()?.username}}
        {{userProfileService.userProfile()?.firstName}}
        {{userProfileService.userProfile()?.lastName}}
        {{userProfileService.userProfile()?.email}}
        {{userProfileService.userProfile()?.role}}
        {{userProfileService.userProfile()?.techStack}}
    `
})

export class UserProfileComponent {
    userProfileService = inject(UserProfileService)

    ngOnInit(){
        this.userProfileService.getProfile()
    }
}