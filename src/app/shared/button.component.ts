import { Component, computed, inject, input, output } from '@angular/core';
import { AuthorisePermission } from '../core/permission.constant';
import { AuthApiService } from '../core/services/auth/auth.service';

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit"
}

export enum ButtonVariant {
  DEFAULT = 'default',
  DANGER = 'danger',
  SAVE = 'save'
}

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    @if(isVisible()){
      <button 
        [type]="type()"  
        [disabled]="isDisable()"
        [attr.aria-disabled]="isDisable()"
        [attr.aria-label]="ariaLabel() || null"
        [class]="variant()"
        (click)="clicked.emit($event)">
      <ng-content />
    </button>
  }
  `,
  styles: [`
    button {
      min-width: 2.75rem;  
      min-height: 2.75rem;
      padding: 0.5rem 0.875rem;
      border-radius: 6px;
      border: 2px solid transparent;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.98rem;
      line-height: 1.25;
      color: #ffffff;
      background: var(--btn-color, #0056b3);
      transition: background-color 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      
      outline: none;
    }

    button:focus-visible {
      outline: 3px solid #005fcc;
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.9);
    }

    button:hover:not(:disabled) {
      opacity: 0.92;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    button:active:not(:disabled) {
      transform: scale(0.96);
    }

    button:disabled {
      opacity: 0.6; 
      cursor: not-allowed;
      box-shadow: none;
    }

    button.danger {
      background: var(--btn-danger-bg, #dc3545);
    }
    button.danger:hover:not(:disabled) {
      background: var(--btn-danger-hover, #bb2d3b);
    }

    button.save {
      background: var(--btn-save-bg, #198754);
    }
    button.save:hover:not(:disabled) {
      background: var(--btn-save-hover, #157347);
    }

    @media (forced-colors: active) {
      button {
        border: 2px solid ButtonText;
      }
      button:focus-visible {
        outline: 3px solid Highlight;
      }
    }
  `]
})
export class ButtonComponent {
  type = input<ButtonType>(ButtonType.BUTTON);
  isDisable = input<boolean>(false);
  variant = input<ButtonVariant>(ButtonVariant.DEFAULT);
  ariaLabel = input<string>('');
  clicked = output<MouseEvent>(); 
  permission = input<string | null>(null);

  authService = inject(AuthApiService)

  isVisible = computed(() => {
    const permissionVal : string | null = this.permission()

    if(permissionVal === null){
      return true
    }

    const requiredRoles = AuthorisePermission[permissionVal]
      // Component is open to everyone
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
      
      // Check if the user has at least one of the required roles
      const userRole = this.authService.currentUser()?.role;
      
      if(userRole === undefined || userRole === null){      
        return false
      }
      
      return requiredRoles.includes(userRole);
  });
}