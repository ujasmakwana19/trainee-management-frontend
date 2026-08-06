import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
import { InputComponent } from "../../../../shared/input.component";
import { DropdownComponent, DropdownOption } from "../../../../shared/dropdown.component";
import { TextValue } from "../../../../shared/text.localizer";
import { ToasterService } from "../../../../core/services/toaster/toaster.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MentorResponse, MentorStatus, MentorUpdateRequest } from "../../../../core/services/mentor/mentor.model";
import { allowedStatusValidator } from "../../../../core/services/mentor/mentor.model";
import { MentorService } from "../../../../core/services/mentor/mentor.service";
import { RoutePath } from "../../../../core/route.constant";
import { SUCCESS } from "../../../../core/toastermessage.localizer";


@Component({
  selector: 'app-mentor-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, DropdownComponent],
  templateUrl: `mentor.edit.html`,
  styleUrl: `mentor.edit.css`
})
export class EditMentorComponent implements OnInit{
  ButtonType = ButtonType;
  ButtonVarient = ButtonVariant;
  TextValue = TextValue;

  private mentorService = inject(MentorService);
  private toasterService = inject(ToasterService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isClicked = signal<boolean>(false);

  id: number | undefined = undefined;
  mentor: MentorResponse | undefined = undefined;

  statusOptions: DropdownOption<MentorStatus>[] = [
    { label: 'Active', value: MentorStatus.Active },
    { label: 'Inactive', value: MentorStatus.Inactive }
  ];

  updateMentor = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    expertise: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
    status: new FormControl<MentorStatus>(MentorStatus.Active, { nonNullable: true, validators: [allowedStatusValidator] }),
  });

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.id = rawId ? Number(rawId) : undefined;

    if (this.id !== undefined && !isNaN(this.id)) {
      this.mentor = this.mentorService.mentors().find(t => t.id === this.id);
    }

    if (!this.mentor || this.mentor.status === undefined) {
      this.router.navigate([RoutePath.HOME]);
      return;
    }

    this.updateMentor.patchValue({
      firstName: this.mentor.firstName,
      lastName: this.mentor.lastName,
      email: this.mentor.email,
      expertise: this.mentor.expertise,
      status: this.mentor.status 
    });
  }

  onSubmit(): void {
    if (this.updateMentor.invalid) {
      return;
    }
    
    this.isClicked.set(true);

    const credentials: MentorUpdateRequest = {
      ...this.updateMentor.getRawValue(),
    };

    this.mentorService.updateMentor(this.id!, credentials).subscribe({
      next: () => {
        this.router.navigate([RoutePath.MENTOR_BASE]);
      },
      complete: () => {
        this.isClicked.set(false)
        this.toasterService.showMessage(SUCCESS.MENTOR_UPDATED)
      }
    });
  }
}