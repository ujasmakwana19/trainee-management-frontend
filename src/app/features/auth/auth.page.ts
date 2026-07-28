import { Component } from '@angular/core';
import { LoginComponent } from './component/login.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginComponent],
  template: `<app-login />`
})
export class AuthPage {
  title = "Login - Trainee Management"
}