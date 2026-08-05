import { Component } from "@angular/core";
import { UserProfileComponent } from "./component/userprofile.component";

@Component({
    selector : `app-userprofile`,
    standalone : true,
    imports : [UserProfileComponent],
    template : `<app-userprofile-view />`
})

export class UserProfilePage {
}