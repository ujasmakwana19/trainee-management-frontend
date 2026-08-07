import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '../../../../core/route.constant';
import { TextValue } from '../../../../shared/text.localizer';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { ToasterService } from '../../../../core/services/toaster/toaster.service';
import { SUCCESS } from '../../../../core/toastermessage.localizer';
import { TaskAssignmentService } from '../../../../core/services/taskAssigned/taskAssigned.service';
import { TaskAssignmentResponse, TaskAssignmentStatus, TaskAssignmentUpdateRequest, allowedStatusValidator } from '../../../../core/services/taskAssigned/taskAssigned.model';

@Component({
  selector: 'app-taskAssigned-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DropdownComponent],
  templateUrl: `taskAssigned.edit.html`,
  styleUrl: `taskAssigned.edit.css`
})

export class EditTaskAssignmentComponent implements OnInit{
  ButtonType = ButtonType;
  ButtonVarient = ButtonVariant;
  TextValue = TextValue;

  private taskAssignmentService = inject(TaskAssignmentService);
  private toasterService = inject(ToasterService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isClicked = signal<boolean>(false);

  id: number | undefined = undefined;
  taskAssigned: TaskAssignmentResponse | undefined = undefined;

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

  updateTaskAssignment = new FormGroup({
    status: new FormControl<TaskAssignmentStatus>(
      TaskAssignmentStatus.Assigned, 
      { 
        nonNullable: true, 
        validators: [allowedStatusValidator] 
      }),
  });

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.id = rawId ? Number(rawId) : undefined;

    if (this.id !== undefined && !isNaN(this.id)) {
      this.taskAssigned = this.taskAssignmentService.taskAssignments().find(t => t.id === this.id);
    }

    if (!this.taskAssigned || this.taskAssigned.status === undefined) {
      this.router.navigate([RoutePath.HOME]);
      return;
    }


    this.updateTaskAssignment.patchValue({
      status: this.taskAssigned.status 
    });
  }

  onSubmit(): void {
    if (this.updateTaskAssignment.invalid) {
      return;
    }
    
    this.isClicked.set(true);

    const formValues = this.updateTaskAssignment.getRawValue();


    const credentials: TaskAssignmentUpdateRequest = {
      status: formValues.status
    };

    this.taskAssignmentService.updateTaskAssignment(this.id!, credentials).subscribe({
      next: () => {
        this.router.navigate([RoutePath.TASK_ASSIGNED_BASE]);
      },
      complete: () => {
        this.isClicked.set(false)
        this.toasterService.showMessage(SUCCESS.TASK_ASSIGNED_UPDATED)
      }
    });
  }
}