import { Component, inject, OnInit, signal } from "@angular/core";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
import { DataTableComponent, TableAction, TableColumn } from "../../../../shared/datatable/datatable.component";
import { TextValue } from "../../../../shared/text.localizer";
import { RoutePath } from "../../../../core/route.constant";
import { PermissionKey } from "../../../../core/permission.constant";
import { Router } from "@angular/router";
import { AuthApiService } from "../../../../core/services/auth/auth.service";
import { TaskAssignmentResponse, TaskAssignmentStatus } from "../../../../core/services/taskAssigned/taskAssigned.model";
import { TaskAssignmentService } from "../../../../core/services/taskAssigned/taskAssigned.service";

@Component({
  selector: "app-taskAssign-view",
  standalone: true,
  imports: [ButtonComponent, DataTableComponent],
  templateUrl: `./taskAssigned.view.html`,
  styleUrl: `./taskAssigned.view.css`,
})
export class TaskAssignedViewComponent implements OnInit {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;
  RoutePath = RoutePath;
  PermissionKey = PermissionKey;

  router = inject(Router);
  taskAssignService = inject(TaskAssignmentService)
  authService = inject(AuthApiService);

  isClicked = signal<boolean>(false);

  columns: TableColumn<TaskAssignmentResponse>[] = [
    {
      key: "traineeName",
      header: TextValue.TRAINEE_FULL_NAME,
      format: (row) => row.traineeName,
    },
    {
      key: "mentorName",
      header: TextValue.MENTOR_FULL_NAME,
      format: (row) => row.mentorName,
    },
    {
      key: "taskTitle",
      header: TextValue.TASK_TITLE,
      format: (row) => row.taskTitle,
    },
    {
      key: "assignedDate",
      header: TextValue.TASK_ASSIGN_DATE,
      format: (row) => {
        if (!row.assignedDate) return "-";
        return new Date(row.dueDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      key: "dueDate",
      header: TextValue.TASK_DUE_DATE,
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
      key: "remark",
      header: TextValue.TASK_REMARK,
      type: "text",
      format: (row) => {
        if (!row.remark) return "";
        return row.remark.length > 30
          ? `${row.remark.slice(0, 30)}...`
          : row.remark;
      },
    },
    {
      key: "status",
      header: TextValue.TASK_STATUS,
      type: "status",
      format: (row) => TaskAssignmentStatus[row.status] ?? "Unknown",
      getStatusClass: (row) => {
        switch (row.status) {
          case TaskAssignmentStatus.Assigned:
            return "status-assigned";
          case TaskAssignmentStatus.Inprogess:
            return "status-inprogress";
          case TaskAssignmentStatus.Submitted:
            return "status-submitted";
          case TaskAssignmentStatus.Reviewed:
            return "status-reviewed";
          case TaskAssignmentStatus.Completed:
            return "status-completed";
          default:
            return "status-default";
        }
      },
    },
  ];

  actions: TableAction<TaskAssignmentResponse>[] = [
    {
      label: TextValue.EDIT,
      variant: ButtonVariant.DEFAULT,
      permission: PermissionKey.TASK_ASSIGNED_EDIT,
      onClick: (row) =>
        this.router.navigate([RoutePath.TASK_ASSIGNED_BASE, RoutePath.EDIT, row.id]),
    },
  ];

  ngOnInit() {
    if(this.authService.isActionExists<TaskAssignmentResponse>(this.actions)){
      this.actions = []
    }
    
    this.taskAssignService.getAll().subscribe();
  }
}