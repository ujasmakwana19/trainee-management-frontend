import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/input.component';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '../../../../core/route.constant';
import { TextValue } from '../../../../shared/text.localizer';
import { allowedStatusValidator, TaskUpdateRequest} from '../../../../core/services/task/task.model';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { ToasterService } from '../../../../core/services/toaster/toaster.service';
import { SUCCESS } from '../../../../core/toastermessage.localizer';
import { TaskService } from '../../../../core/services/task/task.service';
import { TaskResponse, TaskStatus } from '../../../../core/services/task/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, DropdownComponent],
  templateUrl: `task.edit.html`,
  styleUrl: `task.edit.css`
})
export class EditTaskComponent implements OnInit{
  ButtonType = ButtonType;
  ButtonVarient = ButtonVariant;
  TextValue = TextValue;

  private taskService = inject(TaskService);
  private toasterService = inject(ToasterService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isClicked = signal<boolean>(false);

  id: number | undefined = undefined;
  task: TaskResponse | undefined = undefined;

  statusOptions: DropdownOption<TaskStatus>[] = [
    { label: 'Draft', value: TaskStatus.Draft },
    { label: 'Published', value: TaskStatus.Published },
    { label: 'Closed', value: TaskStatus.Closed }
  ];

  updateTask = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)] }),
    expectedTechStack: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dueDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<TaskStatus>(TaskStatus.Draft, { nonNullable: true, validators: [allowedStatusValidator] }),
  });

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.id = rawId ? Number(rawId) : undefined;

    if (this.id !== undefined && !isNaN(this.id)) {
      this.task = this.taskService.tasks().find(t => t.id === this.id);
    }

    if (!this.task || this.task.status === undefined) {
      this.router.navigate([RoutePath.HOME]);
      return;
    }

    const formattedDueDate = this.task.dueDate ? new Date(this.task.dueDate).toISOString().split('T')[0] : '';

    this.updateTask.patchValue({
      title: this.task.title,
      description: this.task.description,
      expectedTechStack: this.task.expectedTechStack,
      dueDate: formattedDueDate,
      status: this.task.status 
    });
  }

  onSubmit(): void {
    if (this.updateTask.invalid) {
      return;
    }
    
    this.isClicked.set(true);

    const formValues = this.updateTask.getRawValue();

    const isoDueDate = new Date(formValues.dueDate).toISOString();

    const credentials: TaskUpdateRequest = {
      title: formValues.title,
      description: formValues.description,
      expectedTechStack: formValues.expectedTechStack,
      dueDate: isoDueDate, // Outputs: "2026-06-18T13:08:29.295Z"
      status: formValues.status
    };

    this.taskService.updateTask(this.id!, credentials).subscribe({
      next: () => {
        this.router.navigate([RoutePath.TASK_BASE]);
      },
      complete: () => {
        this.isClicked.set(false)
        this.toasterService.showMessage(SUCCESS.TASK_UPDATED)
      }
    });
  }
}