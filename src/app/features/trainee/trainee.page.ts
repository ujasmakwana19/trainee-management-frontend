import { Component, inject } from "@angular/core";
import { TraineeService } from "../../core/services/trainee/trainee.service";
import { TraineeComponent } from "./component/trainee.component";

@Component({
    selector: 'app-trainee',
    standalone:true,
    imports: [TraineeComponent],
    template : `<trainee-view />`,
    styles : ``
})

export class TraineePage {


}