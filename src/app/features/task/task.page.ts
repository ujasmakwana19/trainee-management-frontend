import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector : 'app-task',
    standalone : true,
    imports: [RouterOutlet],
    template : `<router-outlet>`
})

export class TaskPage {

}