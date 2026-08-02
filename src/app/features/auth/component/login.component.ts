import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeToggleComponent } from '../../../shared/themebuttton.component';
import { InputComponent } from '../../../shared/input.component';
import { ButtonComponent, ButtonType } from '../../../shared/button.component';
import { AuthApiService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { RoutePath } from '../../../core/route.constant';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { LoaderService } from '../../../core/services/loader/loader.service';

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
  private loaderService = inject(LoaderService)
  isClicked = signal<boolean>(false)

  // NonNullable form control values ensure string types instead of string | null
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] })
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isClicked.set(true)
    this.loaderService.show();
    const credentials = this.loginForm.getRawValue();

    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        this.router.navigate([RoutePath.HOME])
        this.loaderService.hide();
      },
      error: (err) => {
        this.isClicked.set(false)
        this.loaderService.hide();
      }
    });
  }
}