import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/input.component';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';
import { Router } from '@angular/router';
import { RoutePath } from '../../../../core/route.constant';
import { TextValue } from '../../../../shared/text.localizer';
import { allowedStatusValidator, TraineeCreateRequest, TraineeStatus } from '../../../../core/services/trainee/trainee.model';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { TraineeService } from '../../../../core/services/trainee/trainee.service';

@Component({
  selector: 'app-trainee-add',
  standalone: true,
  imports: [ ReactiveFormsModule, ButtonComponent, InputComponent, DropdownComponent],
  templateUrl: `trainee.add.html`,
  styleUrl: `trainee.add.css`
})

export class AddTraineeComponent {
  ButtonType = ButtonType;
  ButtonVarient = ButtonVariant;
  TextValue = TextValue

  
  private traineeService = inject(TraineeService);
  private router = inject(Router)
  isClicked = signal<boolean>(false)

  statusOptions: DropdownOption<TraineeStatus>[] = [
    { label: 'Active', value: TraineeStatus.Active },
    { label: 'Inactive', value: TraineeStatus.Inactive }
  ];

  // NonNullable form control values ensure string types instead of string | null
  addTrainee = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3),Validators.maxLength(50)] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3),Validators.maxLength(50)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    techStack : new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3),Validators.maxLength(50)] }),
    password : new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    status : new FormControl<TraineeStatus >(TraineeStatus.Active, {nonNullable: true, validators: [allowedStatusValidator] }),
  });

  onSubmit() {
    if (this.addTrainee.invalid) {
      return;
    }
    this.isClicked.set(true)
    const credentials = this.addTrainee.getRawValue() as TraineeCreateRequest;

    this.traineeService.createTrainee(credentials).subscribe({
      next: (response) => {
        this.router.navigate([RoutePath.TRAINEE_BASE])
      },
      error: (err) => {
      },
      complete: () => this.isClicked.set(false)
    });
  }
}