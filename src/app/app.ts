import { Component } from '@angular/core';
import { LoginComponent } from './features/auth/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  template: `
    <app-login />
  `,
  styles: ``,
})
export class App {

}
