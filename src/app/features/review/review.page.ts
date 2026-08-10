import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector : `app-review`,
    standalone : true,
    imports : [RouterOutlet],
    template : `<router-outlet />`
})

export class ReviewPage {
}