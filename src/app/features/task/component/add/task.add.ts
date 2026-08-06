import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/input.component';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '../../../../core/route.constant';
import { TextValue } from '../../../../shared/text.localizer';
import { allowedStatusValidator, TaskCreateRequest, TaskUpdateRequest} from '../../../../core/services/task/task.model';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { ToasterService } from '../../../../core/services/toaster/toaster.service';
import { SUCCESS } from '../../../../core/toastermessage.localizer';
import { TaskService } from '../../../../core/services/task/task.service';
import { TaskResponse, TaskStatus } from '../../../../core/services/task/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, DropdownComponent],
  templateUrl: `task.add.html`,
  styleUrl: `task.add.css`
})
export class AddTaskComponent {
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

  addTask = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)] }),
    expectedTechStack: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dueDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<TaskStatus>(TaskStatus.Draft, { nonNullable: true, validators: [allowedStatusValidator] }),
  });

  onSubmit(): void {
    if (this.addTask.invalid) {
      return;
    }
    
    this.isClicked.set(true);

    const formValues = this.addTask.getRawValue();

    const isoDueDate = new Date(formValues.dueDate).toISOString();

    const credentials: TaskCreateRequest = {
      title: formValues.title,
      description: formValues.description,
      expectedTechStack: formValues.expectedTechStack,
      dueDate: isoDueDate, 
      status: formValues.status
    };

    this.taskService.createTask(credentials).subscribe({
      next: () => {
        this.router.navigate([RoutePath.TASK_BASE]);
      },
      complete: () => {
        this.isClicked.set(false)
      }
    });
  }
}