import { Component } from '@angular/core';
import { ModuleComponent } from '../../shared/module/module.component';
import { UserRole } from '../../core/services/auth/auth.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ModuleComponent],
  templateUrl:'side-bar.component.html' ,
  styleUrl : 'side-bar.component.css'
})
export class SideBarComponent {
  UserRole = UserRole;
}