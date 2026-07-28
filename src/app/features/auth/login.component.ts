import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../../shared/themebuttton.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, ButtonType } from '../../shared/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ThemeToggleComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ButtonType = ButtonType
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
  }
}