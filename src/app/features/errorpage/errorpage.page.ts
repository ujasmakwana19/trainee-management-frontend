import { Component } from "@angular/core";

@Component({
    selector : 'app-error-page',
    standalone : true,
    imports : [],
    template : `
        <h1>404</h1>
        <p>Route Not Found</p>
    `

})

export class ErrorPage {
    title = "Trainee Management"
}