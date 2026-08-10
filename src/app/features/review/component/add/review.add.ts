import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InputComponent } from '../../../../shared/input.component';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';

import { TraineeService } from '../../../../core/services/trainee/trainee.service';
import { MentorService } from '../../../../core/services/mentor/mentor.service';
import { TaskService } from '../../../../core/services/task/task.service';
import { TaskAssignmentService } from '../../../../core/services/taskAssigned/taskAssigned.service';

import { RoutePath } from '../../../../core/route.constant';
import { TextValue } from '../../../../shared/text.localizer';

import { forkJoin } from 'rxjs';
import { SubmissionService } from '../../../../core/services/submission/submission.service';
import { ReviewService } from '../../../../core/services/review/review.service';
import { ReviewCreateRequest, ReviewStatus , allowedStatusValidator} from '../../../../core/services/review/review.model';

@Component({
  selector: 'app-submission-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent,
    ButtonComponent
  ],
  templateUrl: './review.add.html',
  styleUrl: './review.add.css'
})
export class AddReviewComponent implements OnInit {

  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;

  private reviewService = inject(ReviewService);
  private submissionService = inject(SubmissionService);
  private mentorService = inject(MentorService);

  private router = inject(Router);

  isClicked = signal(false);

  submissionOptions = signal<DropdownOption<number>[]>([]);
  mentorOptions = signal<DropdownOption<number>[]>([]);

  statusOptions: DropdownOption<ReviewStatus>[] = [
    {
      label: 'Accepted',
      value: ReviewStatus.Accepted
    },
    {
      label: 'ChangesRequired',
      value: ReviewStatus.ChangesRequired
    },
    {
      label: 'Rejected',
      value: ReviewStatus.Rejected
    }
  ];

  addReview = new FormGroup({
    submissionId: new FormControl<number | null>(null, Validators.required),
    mentorId: new FormControl<number | null>(null, Validators.required),
    feedback: new FormControl<string>('', Validators.required),
    score: new FormControl<number | null>(null, Validators.required),

    reviewedDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),


    reviewStatus: new FormControl<ReviewStatus>(
      ReviewStatus.Accepted,
      {
        nonNullable: true,
        validators: [allowedStatusValidator]
      }
    ),

    
  });

  ngOnInit(): void {
    forkJoin({
      submission : this.submissionService.getAll(),
      mentor : this.mentorService.getAll(),
    }).subscribe({
      next: ({ submission }) => {

        this.submissionOptions.set(
          this.submissionService.submissions().map(t => ({
            label: t.taskAssignmentTitle + " " + t.submissionUrl,
            value: t.id
          }))
        );
        
        this.mentorOptions.set(
          this.mentorService.mentors().map(t => ({
            label: t.firstName + " " + t.lastName,
            value: t.id
          }))
        );
      }
    });
  }

  onSubmit(): void {

    if (this.addReview.invalid) {
      this.addReview.markAllAsTouched();
      return;
    }

    this.isClicked.set(true);

    const value = this.addReview.getRawValue();

    const body: ReviewCreateRequest = {
      submissionId: value.submissionId!,
      mentorId: value.mentorId!,
      feedback: value.feedback!,
      score: value.score!,
      reviewedDate: value.reviewedDate,
      reviewStatus: value.reviewStatus,
    };

    this.reviewService.createReview(body)
      .subscribe({
        next: () => {
          this.router.navigate([RoutePath.REVIEW_BASE]);
        },
        complete: () => {
          this.isClicked.set(false);
        }
      });
  }
}