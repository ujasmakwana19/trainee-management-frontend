import { Component, inject } from "@angular/core";
import { ModuleComponent } from "../../shared/module/module.component";
import { ThemeToggleComponent } from "../../shared/themebuttton.component";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../shared/button.component";
import { Router } from "@angular/router";
import { AuthApiService } from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModuleComponent, ThemeToggleComponent, ButtonComponent],
  template: `
    <div class="header-container">
      <div class="header-left">
        <span class="app-title">Dashboard</span>
      </div>

      <div class="header-right">
        <app-module routeLink="/user-profile" classType="profile-link">
          <div class="avatar-badge" title="User Profile">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              class="avatar-icon"
            >
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.6-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
            </svg>
          </div>
        </app-module>

        <div class="theme-toggle-wrap">
          <app-theme-button />
        </div>

        <div>
          <app-button
            [type]="ButtonType.SUBMIT"
            [variant]="ButtonVariant.DANGER"
            (clicked)="logout()">
            LOGOUT
          </app-button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .app-title {
      font-weight: 600;
      font-size: 1.125rem;
      color: var(--text-color);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-left: auto;
    }

    .avatar-badge {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: var(--bg-color);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .avatar-badge:hover {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .avatar-icon {
      width: 22px;
      height: 22px;
    }

    .profile-link {
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }
  `]
})
export class HeaderComponent {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  authService = inject(AuthApiService);
  router = inject(Router);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log("Logout Success")
        this.router.navigate(['/login'])
      },
      error: () => console.log("Logout fail")
    });

  }
}