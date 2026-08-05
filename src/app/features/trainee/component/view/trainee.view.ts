  import { Component, inject, OnInit, signal } from "@angular/core";
  import { TraineeService } from "../../../../core/services/trainee/trainee.service";
  import { TraineeResponse, TraineeStatus } from "../../../../core/services/trainee/trainee.model";
  import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
  import { Router } from "@angular/router";
  import { RoutePath } from "../../../../core/route.constant";
  import { AuthorisePermission, PermissionKey } from "../../../../core/permission.constant";
  import { DataTableComponent, TableColumn, TableAction } from "../../../../shared/datatable/datatable.component";
  import { TextValue } from "../../../../shared/text.localizer";
  import { ToasterService } from "../../../../core/services/toaster/toaster.service";
  import { SUCCESS } from "../../../../core/message.localizer";
import { AuthApiService } from "../../../../core/services/auth/auth.service";

  @Component({
    selector: 'trainee-view',
    standalone: true,
    imports: [ButtonComponent, DataTableComponent],
    templateUrl: `trainee.view.html`,
    styleUrl: `trainee.view.css` 
  })
  export class TraineeComponent implements OnInit {
    ButtonType = ButtonType;
    ButtonVariant = ButtonVariant
    TextValue = TextValue
    RoutePath = RoutePath;
    PermissionKey = PermissionKey;
    
    router = inject(Router);
    traineeService = inject(TraineeService);
    authService = inject(AuthApiService)

    isClicked = signal<boolean>(false)
    toasterService = inject(ToasterService)

    columns: TableColumn<TraineeResponse>[] = [
      {
        key: 'firstName',
        header: 'First Name',
        format: (row) => `${row.firstName}`
      },
      {
        key: 'lastName',
        header: 'Last Name',
        format: (row) => `${row.lastName}`
      },
      {
        key: 'email',
        header: 'Email'
      },
      {
        key: 'techStack',
        header: 'Tech Stack',
        type: 'badge'
      },
      {
        key: 'status',
        header: 'Status',
        type: 'status',
        format: (row) => TraineeStatus[row.status],
        getStatusClass: (row) => row.status === TraineeStatus.Active ? 'status-active' : 'status-inactive'
      }
    ];

    actions: TableAction<TraineeResponse>[] = [
      {
        label: TextValue.EDIT,
        variant : ButtonVariant.DEFAULT,
        permission: PermissionKey.TRAINEE_EDIT,
        onClick: (row) => this.router.navigate([RoutePath.TRAINEE_BASE, RoutePath.EDIT, row.id])
      },
      {
        label: TextValue.DELETE,
        variant: ButtonVariant.DANGER,
        permission: PermissionKey.TRAINEE_DELETE,
        onClick: (row) => this.onDelete(row)
      }
    ];

    isActionExists() : void {
        const actionsToCheck = this.actions
        for (let i = 0; i < actionsToCheck.length; i++) {
          const permission = actionsToCheck[i].permission;

          const userRole = this.authService.currentUser()?.role

          if(userRole === undefined || userRole === null){      
            this.actions = []
          }
          else if(AuthorisePermission[permission].includes(userRole)){
            break;
          }

          if(i == actionsToCheck.length - 1){
            this.actions = []
          }
          
        }
    }


    ngOnInit() {
      this.isActionExists();
      this.traineeService.getAll();
    }

    private onDelete(trainee: TraineeResponse) {
      if (confirm(`Are you sure you want to delete Trainee`)) {
        this.isClicked.set(true)
        this.traineeService.deleteTrainee(trainee.id).subscribe({
          complete: (() =>  {
            this.isClicked.set(false)
            this.toasterService.showMessage(SUCCESS.TRAINEE_DELETED)
          }),
        })
        console.log('Trainee Deleted Successfully');
        
      }
    }
  }