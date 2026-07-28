import { Routes } from '@angular/router';
import { AuthPage } from './features/auth/auth.page';
import { HomePage } from './features/home/home.page';
import { ErrorPage } from './features/errorpage/errorpage.page';
import { authGuard } from './core/guards/auth.guards';

const routes: Routes = [
  { path: 'login', component: AuthPage },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'home', component: HomePage },
    ]
  },
  { path: 'errorpage', component: ErrorPage },
  { path: '**', redirectTo: 'errorpage' }
];

export default routes