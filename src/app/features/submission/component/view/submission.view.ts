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
import { SubmissionService } from "../../../../core/services/submission/submission.service";
import { SubmissionResponse, SubmissionStatus } from "../../../../core/services/submission/submission.model";

@Component({
  selector: "app-submission-view",
  standalone: true,
  imports: [ButtonComponent, DataTableComponent],
  templateUrl: `./submission.view.html`,
  styleUrl: `./submission.view.css`,
})
export class SubmissionViewComponent implements OnInit {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;
  RoutePath = RoutePath;
  PermissionKey = PermissionKey;

  router = inject(Router);
  submissionService = inject(SubmissionService)
  authService = inject(AuthApiService);

  isClicked = signal<boolean>(false);

  columns: TableColumn<SubmissionResponse>[] = [
    {
      key: "taskAssignmentTitle",
      header: TextValue.TASK_TITLE,
      format: (row) => row.taskAssignmentTitle,
    },
    {
      key: "submissionUrl",
      header: TextValue.SUBMISSION_URL,
      format: (row) => row.submissionUrl,
    },
    {
      key: "submittedDate",
      header: TextValue.TASK_SUBMITTED_DATE,
      format: (row) => {
        if (!row.submittedDate) return "-";
        return new Date(row.submittedDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      key: "notes",
      header: TextValue.TASK_REMARK,
      type: "text",
      format: (row) => {
        if (!row.notes) return "";
        return row.notes.length > 30
          ? `${row.notes.slice(0, 30)}...`
          : row.notes;
      },
    },
    {
      key: "status",
      header: TextValue.TASK_STATUS,
      type: "status",
      format: (row) => SubmissionStatus[row.status] ?? "Unknown",
      getStatusClass: (row) => {
        switch (row.status) {
          case SubmissionStatus.Submitted:
            return "status-assigned";
          case SubmissionStatus.ReSubmitted:
            return "status-inprogress";
          default:
            return "status-default";
        }
      },
    },
  ];


  ngOnInit() {
    this.submissionService.getAll().subscribe();
  }
}