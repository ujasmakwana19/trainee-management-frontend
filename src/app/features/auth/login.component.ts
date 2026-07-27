import { Component, inject } from '@angular/core';
import { ButtonComponent, ButtonVarient, ButtonType } from '../../shared/button.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="login-container">
      <h2>Login Page</h2>

      <app-button 
        [variant] = "buttonVarient"
        [type] = "buttonType"
        (clicked)="toggleTheButton()">
        
        Toggle {{ themeService.theme() === 'dark' ? 'Light' : 'Dark' }} Mode
        
    </app-button>
    </div>
  `
})
export class LoginComponent {

    buttonVarient = ButtonVarient.PRIMARY
    buttonType = ButtonType.BUTTON
    protected themeService = inject(ThemeService);
    toggleTheButton() {
        if(this.buttonVarient === ButtonVarient.PRIMARY) this.buttonVarient = ButtonVarient.SECONDARY
        else if(this.buttonVarient === ButtonVarient.SECONDARY) this.buttonVarient = ButtonVarient.PRIMARY
        else this.buttonVarient = ButtonVarient.PRIMARY
        this.themeService.toggleTheme()
    }
}