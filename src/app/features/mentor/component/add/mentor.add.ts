import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MentorService } from '../../../../core/services/mentor/mentor.service';
import { allowedStatusValidator, MentorCreateRequest, MentorStatus } from '../../../../core/services/mentor/mentor.model';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../../../shared/button.component';
import { InputComponent } from '../../../../shared/input.component';
import { DropdownComponent, DropdownOption } from '../../../../shared/dropdown.component';
import { TextValue } from '../../../../shared/text.localizer';
import { RoutePath } from '../../../../core/route.constant';

@Component({
  selector: 'app-mentor-add',
  standalone: true,
  imports: [ ReactiveFormsModule, ButtonComponent, InputComponent, DropdownComponent],
  templateUrl: `mentor.add.html`,
  styleUrl: `mentor.add.css`
})

export class AddMentorComponent {
  ButtonType = ButtonType;
  ButtonVarient = ButtonVariant;
  TextValue = TextValue

  
  private mentorService = inject(MentorService);
  private router = inject(Router)
  isClicked = signal<boolean>(false)

  statusOptions: DropdownOption<MentorStatus>[] = [
    { label: 'Active', value: MentorStatus.Active },
    { label: 'Inactive', value: MentorStatus.Inactive }
  ];

  // NonNullable form control values ensure string types instead of string | null
  addMentor = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3),Validators.maxLength(50)] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3),Validators.maxLength(50)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    expertise : new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3),Validators.maxLength(50)] }),
    password : new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    status : new FormControl<MentorStatus >(MentorStatus.Active, {nonNullable: true, validators: [allowedStatusValidator] }),
  });

  onSubmit() {
    if (this.addMentor.invalid) {
      return;
    }
    this.isClicked.set(true)
    const credentials = this.addMentor.getRawValue() as MentorCreateRequest;

    this.mentorService.createMentor(credentials).subscribe({
      next: (response) => {
        this.router.navigate([RoutePath.MENTOR_BASE])
      },
      error: (err) => {
      },
      complete: () => this.isClicked.set(false)
    });
  }
}