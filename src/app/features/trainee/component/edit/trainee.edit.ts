import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/input.component';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '../../../../core/route.constant';
import { TextValue } from '../../../../shared/text.localizer';
import { allowedStatusValidator, TraineeResponse, TraineeStatus, TraineeUpdateRequest } from '../../../../core/services/trainee/trainee.model';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { TraineeService } from '../../../../core/services/trainee/trainee.service';
import { ToasterService } from '../../../../core/services/toaster/toaster.service';
import { TRAINEE_UPDATE } from '../../../../core/services/trainee/trainee.route';
import { SUCCESS } from '../../../../core/message.localizer';

@Component({
  selector: 'app-trainee-add',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, DropdownComponent],
  templateUrl: `trainee.edit.html`,
  styleUrl: `trainee.edit.css`
})
export class EditTraineeComponent implements OnInit{
  ButtonType = ButtonType;
  ButtonVarient = ButtonVariant;
  TextValue = TextValue;

  private traineeService = inject(TraineeService);
  private toasterService = inject(ToasterService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isClicked = signal<boolean>(false);

  id: number | undefined = undefined;
  trainee: TraineeResponse | undefined = undefined;

  statusOptions: DropdownOption<TraineeStatus>[] = [
    { label: 'Active', value: TraineeStatus.Active },
    { label: 'Inactive', value: TraineeStatus.Inactive }
  ];

  updateTrainee = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    techStack: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    status: new FormControl<TraineeStatus>(TraineeStatus.Active, { nonNullable: true, validators: [allowedStatusValidator] }),
  });

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.id = rawId ? Number(rawId) : undefined;

    if (this.id !== undefined && !isNaN(this.id)) {
      this.trainee = this.traineeService.trainees().find(t => t.id === this.id);
    }

    if (!this.trainee || this.trainee.status === undefined) {
      this.router.navigate([RoutePath.HOME]);
      return;
    }

    this.updateTrainee.patchValue({
      firstName: this.trainee.firstName,
      lastName: this.trainee.lastName,
      email: this.trainee.email,
      techStack: this.trainee.techStack,
      status: this.trainee.status 
    });
  }

  onSubmit(): void {
    if (this.updateTrainee.invalid) {
      return;
    }
    
    this.isClicked.set(true);

    const credentials: TraineeUpdateRequest = {
      ...this.updateTrainee.getRawValue(),
    };

    this.traineeService.updateTrainee(this.id!, credentials).subscribe({
      next: () => {
        this.router.navigate([RoutePath.TRAINEE_BASE]);
      },
      complete: () => {
        this.isClicked.set(false)
        this.toasterService.showMessage(SUCCESS.TRAINEE_UPDATED)
      }
    });
  }
}