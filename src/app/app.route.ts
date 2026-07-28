import { Routes } from '@angular/router';
import { AuthPage } from './features/auth/auth.page';

const routes: Routes = [
  { path: 'login', component: AuthPage },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

export default routes