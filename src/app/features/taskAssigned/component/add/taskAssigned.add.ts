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

import {
  allowedStatusValidator,
  TaskAssignmentCreateRequest,
  TaskAssignmentStatus
} from '../../../../core/services/taskAssigned/taskAssigned.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-assignment-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent,
    ButtonComponent
  ],
  templateUrl: './taskAssigned.add.html',
  styleUrl: './taskAssigned.add.css'
})
export class AddTaskAssignmentComponent implements OnInit {

  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue;

  private traineeService = inject(TraineeService);
  private mentorService = inject(MentorService);
  private taskService = inject(TaskService);
  private taskAssignmentService = inject(TaskAssignmentService);

  private router = inject(Router);

  isClicked = signal(false);

  traineeOptions = signal<DropdownOption<number>[]>([]);
  mentorOptions = signal<DropdownOption<number>[]>([]);
  taskOptions = signal<DropdownOption<number>[]>([]);

  statusOptions: DropdownOption<TaskAssignmentStatus>[] = [
    {
      label: 'Assigned',
      value: TaskAssignmentStatus.Assigned
    },
    {
      label: 'Inprogess',
      value: TaskAssignmentStatus.Inprogess
    },
    {
      label: 'Submitted',
      value: TaskAssignmentStatus.Submitted
    },
    {
      label: 'Reviewed',
      value: TaskAssignmentStatus.Reviewed
    },
    {
      label: 'Completed',
      value: TaskAssignmentStatus.Completed
    },

  ];

  addTaskAssignment = new FormGroup({
    traineeId: new FormControl<number | null>(null, Validators.required),

    mentorId: new FormControl<number | null>(null, Validators.required),

    learningTaskId: new FormControl<number | null>(null, Validators.required),

    assignedDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    dueDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    status: new FormControl<TaskAssignmentStatus>(
      TaskAssignmentStatus.Assigned,
      {
        nonNullable: true,
        validators: [allowedStatusValidator]
      }
    ),

    remark: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)]
    })
  });

  ngOnInit(): void {
    forkJoin({
      trainees: this.traineeService.getAll(),
      mentors: this.mentorService.getAll(),
      tasks: this.taskService.getAll()
    }).subscribe({
      next: ({ trainees, mentors, tasks }) => {

        this.traineeOptions.set(
          this.traineeService.trainees().map(t => ({
            label: t.firstName + " " + t.lastName,
            value: t.id
          }))
        );

        this.mentorOptions.set(
          this.mentorService.mentors().map(m => ({
            label: m.firstName + " " + m.lastName,
            value: m.id
          }))
        );

        this.taskOptions.set(
          this.taskService.tasks().map(task => ({
            label: task.title,
            value: task.id
          }))
        );

        console.log('All 3 APIs completed');
      }
    });
  }

  onSubmit(): void {

    if (this.addTaskAssignment.invalid) {
      this.addTaskAssignment.markAllAsTouched();
      return;
    }

    this.isClicked.set(true);

    const value = this.addTaskAssignment.getRawValue();

    const body: TaskAssignmentCreateRequest = {
      traineeId: value.traineeId!,
      mentorId: value.mentorId!,
      learningTaskId: value.learningTaskId!,
      assignedDate: value.assignedDate,
      dueDate: value.dueDate,
      status: value.status,
      remark: value.remark
    };

    this.taskAssignmentService.createTaskAssignment(body)
      .subscribe({
        next: () => {
          this.router.navigate([RoutePath.TASK_ASSIGNED_BASE]);
        },
        complete: () => {
          this.isClicked.set(false);
        }
      });
  }
}