import { Component, inject } from "@angular/core";
import { UserProfileService } from "../../core/services/userprofile/userprofile.service";
import { UserRole } from "../../core/services/auth/auth.model";

@Component({
    selector : `app-userprofile-view`,
    standalone : true,
    imports : [],
    templateUrl : `./userprofile.component.html`,
    styleUrl : `./userprofile.component.css`
})

export class UserProfileComponent {
    userProfileService = inject(UserProfileService)
    UserRole = UserRole

    ngOnInit(){
        this.userProfileService.getProfile()
    }
}