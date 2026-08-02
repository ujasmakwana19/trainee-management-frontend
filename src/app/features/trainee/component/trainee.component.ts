import { Component, inject, OnInit } from "@angular/core";
import { TraineeService } from "../../../core/services/trainee/trainee.service";
import { TraineeResponse, TraineeStatus } from "../../../core/services/trainee/trainee.model";

@Component({
    selector: 'trainee-view',
    standalone:true,
    imports: [],
    template : ` 
        @for (t of this.traineeService.trainees(); track t.id) {
            <p>
                <span>
                    {{t.firstName}}
                </span>
                <span>
                    {{t.lastName}}
                </span>
                <span>
                    {{t.email}}
                </span>
                <span>
                    {{t.techStack}}
                </span>
                <span>
                    {{TraineeStatus[t.status]}}
                </span>
            </p>
        }
    `,
    styles : ``
})

export class TraineeComponent implements OnInit {
    traineeService = inject(TraineeService)
    TraineeStatus = TraineeStatus
        
    ngOnInit(){
        this.traineeService.getAll()
    }
    
}