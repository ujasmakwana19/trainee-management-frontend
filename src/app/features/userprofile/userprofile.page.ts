import { Component } from "@angular/core";
import { UserProfileComponent } from "./userprofile.component";

@Component({
    selector : `app-userprofile`,
    standalone : true,
    imports : [UserProfileComponent],
    template : `<app-userprofile-view />`
})

export class UserProfilePage {
}