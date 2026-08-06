import { Component, inject, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
import { DataTableComponent, TableAction, TableColumn } from "../../../../shared/datatable/datatable.component";
import { TextValue } from "../../../../shared/text.localizer";
import { RoutePath } from "../../../../core/route.constant";
import { AuthorisePermission, PermissionKey } from "../../../../core/permission.constant";
import { MentorService } from "../../../../core/services/mentor/mentor.service";
import { AuthApiService } from "../../../../core/services/auth/auth.service";
import { ToasterService } from "../../../../core/services/toaster/toaster.service";
import { MentorResponse, MentorStatus } from "../../../../core/services/mentor/mentor.model";
import { SUCCESS } from "../../../../core/toastermessage.localizer";

  @Component({
    selector: 'app-mentor-view',
    standalone: true,
    imports: [ButtonComponent, DataTableComponent],
    templateUrl: `mentor.view.html`,
    styleUrl: `mentor.view.css` 
  })
  export class MentorViewComponent implements OnInit {
    ButtonType = ButtonType;
    ButtonVariant = ButtonVariant
    TextValue = TextValue
    RoutePath = RoutePath;
    PermissionKey = PermissionKey;
    
    router = inject(Router);
    mentorService = inject(MentorService);
    authService = inject(AuthApiService)

    isClicked = signal<boolean>(false)
    toasterService = inject(ToasterService)

    columns: TableColumn<MentorResponse>[] = [
      {
        key: 'firstName',
        header: TextValue.FIRST_NAME,
        format: (row) => `${row.firstName}`
      },
      {
        key: 'lastName',
        header: TextValue.LAST_NAME,
        format: (row) => `${row.lastName}`
      },
      {
        key: 'email',
        header: TextValue.EMAIL_LABEL
      },
      {
        key: 'expertise',
        header: TextValue.EXPERTISE_STACK,
        type: 'badge'
      },
      {
        key: 'status',
        header: TextValue.MENTOR_STATUS,
        type: 'status',
        format: (row) => MentorStatus[row.status],
        getStatusClass: (row) => row.status === MentorStatus.Active ? 'status-active' : 'status-inactive'
      }
    ];

    actions: TableAction<MentorResponse>[] = [
      {
        label: TextValue.EDIT,
        variant : ButtonVariant.DEFAULT,
        permission: PermissionKey.MENTOR_EDIT,
        onClick: (row) => this.router.navigate([RoutePath.MENTOR_BASE, RoutePath.EDIT, row.id])
      },
      {
        label: TextValue.DELETE,
        variant: ButtonVariant.DANGER,
        permission: PermissionKey.MENTOR_DELETE,
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
      this.mentorService.getAll();
    }

    private onDelete(mentor: MentorResponse) {
      if (confirm(`Are you sure you want to delete?`)) {
        this.isClicked.set(true)
        this.mentorService.deleteMentor(mentor.id).subscribe({
          complete: (() =>  {
            this.isClicked.set(false)
            this.toasterService.showMessage(SUCCESS.MENTOR_DELETED)
          }),
        })
        
      }
    }
  }