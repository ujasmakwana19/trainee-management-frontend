import { Component } from "@angular/core";
import { HomeComponent } from "./component/home.component";

@Component({
    selector : 'app-home-page',
    standalone : true,
    imports : [HomeComponent],
    template : `<home />`

})

export class HomePage {
    title = "Home - Trainee Management"
    
}