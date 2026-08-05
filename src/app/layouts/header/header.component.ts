import { Component, inject } from "@angular/core";
import { ModuleComponent } from "../../shared/module/module.component";
import { ThemeToggleComponent } from "../../shared/themebuttton.component";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../shared/button.component";
import { Router } from "@angular/router";
import { AuthApiService } from "../../core/services/auth/auth.service";
import { RoutePath } from "../../core/route.constant";
import { PermissionKey } from "../../core/permission.constant";
import { TextValue } from "../../shared/text.localizer";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModuleComponent, ThemeToggleComponent, ButtonComponent],
  templateUrl: `header.component.html`,
  styleUrl: `header.component.css`
})
export class HeaderComponent {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  TextValue = TextValue
  RoutePath = RoutePath
  PermissionKey = PermissionKey
  authService = inject(AuthApiService);
  router = inject(Router);

  logout() {
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {}
    }).add(() => {
      this.router.navigate([RoutePath.AUTH])
    });
  }
}