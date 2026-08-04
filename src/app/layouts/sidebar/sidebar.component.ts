import { Component } from '@angular/core';
import { ModuleComponent } from '../../shared/module/module.component';
import { UserRole } from '../../core/services/auth/auth.model';
import { AuthorisePermission, PermissionKey } from '../../core/permission.constant';
import { RoutePath } from '../../core/route.constant';
import { TextValue } from '../../shared/text.localizer';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ModuleComponent],
  templateUrl:'side-bar.component.html' ,
  styleUrl : 'side-bar.component.css'
})
export class SideBarComponent {
  PermissionKey = PermissionKey
  RoutePath = RoutePath
  AuthorisePermission = AuthorisePermission
  UserRole = UserRole;
  TextValue = TextValue

}