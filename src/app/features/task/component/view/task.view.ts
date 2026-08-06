import { Component, inject, OnInit, signal } from "@angular/core";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
import { DataTableComponent, TableAction, TableColumn } from "../../../../shared/datatable/datatable.component";
import { TextValue } from "../../../../shared/text.localizer";
import { RoutePath } from "../../../../core/route.constant";
import { AuthorisePermission, PermissionKey } from "../../../../core/permission.constant";
import { Router } from "@angular/router";
import { TaskService } from "../../../../core/services/task/task.service";
import { AuthApiService } from "../../../../core/services/auth/auth.service";
import { ToasterService } from "../../../../core/services/toaster/toaster.service";
import { TaskResponse, TaskStatus } from "../../../../core/services/task/task.model";
import { SUCCESS } from "../../../../core/toastermessage.localizer";

@Component({
  selector: "app-task-view",
  standalone: true,
  imports: [ButtonComponent, DataTableComponent],
  templateUrl: `./task.view.html`,
  styleUrl: `./task.view.css`,
})
export class TaskViewComponent implements OnInit {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;
  RoutePath = RoutePath;
  PermissionKey = PermissionKey;

  router = inject(Router);
  taskService = inject(TaskService);
  authService = inject(AuthApiService);
  toasterService = inject(ToasterService);

  isClicked = signal<boolean>(false);

  columns: TableColumn<TaskResponse>[] = [
    {
      key: "title",
      header: TextValue.TASK_TITLE,
      format: (row) => row.title,
    },
    {
      key: "description",
      header: TextValue.TASK_DESCRIPTION,
      format: (row) => {
        if (!row.description) return "";
        return row.description.length > 50
          ? `${row.description.slice(0, 50)}...`
          : row.description;
      },
    },
    {
      key: "expectedTechStack",
      header: TextValue.TASK_TECHSTACK,
      type: "badge",
      format: (row) => row.expectedTechStack,
    },
    {
      key: "dueDate",
      header: TextValue.TASK_DUE_DATE,
      type: "date",
      format: (row) => {
        if (!row.dueDate) return "-";
        return new Date(row.dueDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      key: "status",
      header: TextValue.TASK_STATUS,
      type: "status",
      format: (row) => TaskStatus[row.status] ?? "Unknown",
      getStatusClass: (row) => {
        switch (row.status) {
          case TaskStatus.Draft:
            return "status-draft";
          case TaskStatus.Published:
            return "status-published";
          case TaskStatus.Closed:
            return "status-closed";
          default:
            return "status-default";
        }
      },
    },
  ];

  actions: TableAction<TaskResponse>[] = [
    {
      label: TextValue.EDIT,
      variant: ButtonVariant.DEFAULT,
      permission: PermissionKey.TASK_EDIT,
      onClick: (row) =>
        this.router.navigate([RoutePath.TASK_BASE, RoutePath.EDIT, row.id]),
    },
    {
      label: TextValue.DELETE,
      variant: ButtonVariant.DANGER,
      permission: PermissionKey.TASK_DELETE,
      onClick: (row) => this.onDelete(row),
    },
  ];

  ngOnInit() {
    this.isActionExists();
    this.taskService.getAll();
  }

  private isActionExists() : void {
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

  private onDelete(task: TaskResponse) {
    if (confirm(`Are you sure you want to delete?`)) {
      this.isClicked.set(true);
      this.taskService.deleteTask(task.id).subscribe({
        complete: () => {
          this.isClicked.set(false);
          this.toasterService.showMessage(SUCCESS.TASK_DELETED);
        },
        error: () => this.isClicked.set(false),
      });
    }
  }
}