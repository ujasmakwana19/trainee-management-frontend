import { Component, input, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '../../core/services/auth/auth.service'; 
import { UserRole } from '../../core/services/auth/auth.model';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (isVisible()) {
      <a
        [routerLink]="routeLink()"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: exact() }"
        [class]="classType()"
      >
        <ng-content />
      </a>
    }
  `,
  styleUrl:  'module.component.css'
})
export class ModuleComponent {
  private authService = inject(AuthApiService);

  routeLink = input.required<string>();
  classType = input.required<string>()

  roles = input<UserRole[]>([]);

  // false to work on the prefix based to highlight root and child both
  // true to work on the same url
  exact = input<boolean>(false);

  isVisible = computed(() => {
    const requiredRoles = this.roles();
    
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