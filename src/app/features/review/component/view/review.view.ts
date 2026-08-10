import { Component, inject, OnInit, signal } from "@angular/core";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
import { DataTableComponent, TableAction, TableColumn } from "../../../../shared/datatable/datatable.component";
import { TextValue } from "../../../../shared/text.localizer";
import { RoutePath } from "../../../../core/route.constant";
import { PermissionKey } from "../../../../core/permission.constant";
import { Router } from "@angular/router";
import { AuthApiService } from "../../../../core/services/auth/auth.service";
import { SubmissionResponse, SubmissionStatus } from "../../../../core/services/submission/submission.model";
import { ReviewService } from "../../../../core/services/review/review.service";
import { ReviewResponse, ReviewStatus } from "../../../../core/services/review/review.model";

@Component({
  selector: "app-review-view",
  standalone: true,
  imports: [ButtonComponent, DataTableComponent],
  templateUrl: `./review.view.html`,
  styleUrl: `./review.view.css`,
})
export class ReviewViewComponent implements OnInit {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;
  RoutePath = RoutePath;
  PermissionKey = PermissionKey;

  router = inject(Router);
  reviewService = inject(ReviewService)
  authService = inject(AuthApiService);

  isClicked = signal<boolean>(false);

  columns: TableColumn<ReviewResponse>[] = [
    {
      key: "submission",
      header: TextValue.TASK_SUBMISSION_DETAIL,
      format: (row) => row.submission,
    },
    {
      key: "submissionUrl",
      header: TextValue.SUBMISSION_URL,
      format: (row) => row.submissionUrl,
    },
    {
      key: "mentor",
      header: TextValue.MENTOR,
      format: (row) => row.mentor,
    },
    {
      key: "feedback",
      header: TextValue.FEEDBACK,
      format: (row) => {
        if (!row.feedback) return "";
        return row.feedback.length > 30
          ? `${row.feedback.slice(0, 30)}...`
          : row.feedback;
      },
    },
    {
      key: "score",
      header: TextValue.TASK_SCORE,
      format: (row) => row.score.toString(),
    },
    {
      key: "reviewedDate",
      header: TextValue.TASK_REVIEWED_DATE,
      format: (row) => {
        if (!row.reviewedDate) return "-";
        return new Date(row.reviewedDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      key: "reviewStatus",
      header: TextValue.TASK_STATUS,
      type: "status",
      format: (row) => ReviewStatus[row.reviewStatus] ?? "Unknown",
      getStatusClass: (row) => {
        switch (row.reviewStatus) {
          case ReviewStatus.Accepted:
            return "status-published";
          case ReviewStatus.ChangesRequired:
            return "status-inprogress";
          case ReviewStatus.Rejected:
            return "status-closed";
          default:
            return "status-default";
        }
      },
    },
  ];


  ngOnInit() {
    this.reviewService.getAll().subscribe();
  }
}