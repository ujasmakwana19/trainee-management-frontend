import { Component } from '@angular/core';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginComponent],
  template: `<app-login />`
})
export class AuthPage {}