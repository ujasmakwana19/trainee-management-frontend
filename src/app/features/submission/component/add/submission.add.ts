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
import { SubmissionCreateRequest, SubmissionStatus , allowedStatusValidator} from '../../../../core/services/submission/submission.model';

@Component({
  selector: 'app-submission-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent,
    ButtonComponent
  ],
  templateUrl: './submission.add.html',
  styleUrl: './submission.add.css'
})
export class AddSubmission implements OnInit {

  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;

  private submissionService = inject(SubmissionService);
  private mentorService = inject(MentorService);
  private taskAssignmentService = inject(TaskAssignmentService);

  private router = inject(Router);

  isClicked = signal(false);

  taskAssignedOptions = signal<DropdownOption<number>[]>([]);

  statusOptions: DropdownOption<SubmissionStatus>[] = [
    {
      label: 'Submitted',
      value: SubmissionStatus.Submitted
    },
    {
      label: 'Resubmitted',
      value: SubmissionStatus.ReSubmitted
    }];

  addSubmission = new FormGroup({
    taskAssignmentId: new FormControl<number | null>(null, Validators.required),
    submissionUrl: new FormControl<string>('', Validators.required),
    submittedDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    notes: new FormControl(''),

    status: new FormControl<SubmissionStatus>(
      SubmissionStatus.Submitted,
      {
        nonNullable: true,
        validators: [allowedStatusValidator]
      }
    ),

    
  });

  ngOnInit(): void {
    forkJoin({
      taskAssignment : this.taskAssignmentService.getAll(),
    }).subscribe({
      next: ({ taskAssignment }) => {

        this.taskAssignedOptions.set(
          this.taskAssignmentService.taskAssignments().map(t => ({
            label: t.taskTitle,
            value: t.id
          }))
        );

      }
    });
  }

  onSubmit(): void {

    if (this.addSubmission.invalid) {
      this.addSubmission.markAllAsTouched();
      return;
    }

    this.isClicked.set(true);

    const value = this.addSubmission.getRawValue();

    const body: SubmissionCreateRequest = {
      taskAssignmentId: value.taskAssignmentId!,
      submissionUrl: value.submissionUrl!,
      notes: value.notes!,
      submittedDate: value.submittedDate,
      status: value.status,
    };

    this.submissionService.createSubmisson(body)
      .subscribe({
        next: () => {
          this.router.navigate([RoutePath.SUBMISSION_BASE]);
        },
        complete: () => {
          this.isClicked.set(false);
        }
      });
  }
}