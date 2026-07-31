import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeToggleComponent } from '../../../shared/themebuttton.component';
import { InputComponent } from '../../../shared/input.component';
import { ButtonComponent, ButtonType } from '../../../shared/button.component';
import { AuthApiService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { RoutePath } from '../../../core/route.constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ThemeToggleComponent, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  ButtonType = ButtonType;
  private authService = inject(AuthApiService);
  private router = inject(Router)

  // NonNullable form control values ensure string types instead of string | null
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] })
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.getRawValue();

    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        this.router.navigate([RoutePath.HOME])
      },
      error: (err) => {
      }
    });
  }
}