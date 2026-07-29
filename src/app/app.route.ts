import { Routes } from '@angular/router';
import { AuthPage } from './features/auth/auth.page';
import { ErrorPage } from './features/errorpage/errorpage.page';
import { authGuard } from './core/guards/auth.guards';
import { MainLayout } from './layouts/main.page';

const routes: Routes = [
  { 
    path: 'login', 
    component: AuthPage 
  },
  {
    path: '',
    component: MainLayout,
    canActivateChild: [authGuard],
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      { 
        path: 'home', 
        loadComponent: () => import('./features/home/home.page').then(m => m.HomePage)
      },
      { 
        path: 'user-profile', 
        loadComponent: () => import('./features/userprofile/userprofile.page').then(m => m.UserProfilePage)
      },
      { 
        path: 'trainee', 
        loadComponent: () => import('./features/trainee/trainee.page').then(m => m.TraineePage)
      },
      { 
        path: 'mentor', 
        loadComponent: () => import('./features/mentor/mentor.page').then(m => m.MentorPage)
      },
      { 
        path: 'submission', 
        loadComponent: () => import('./features/submission/submission.page').then(m => m.SubmissionPage)
      },
      {
        path:'task',
        loadComponent : () => import('./features/task/task.page').then(m => m.TaskPage)
      },
      {
        path:'review',
        loadComponent : () => import('./features/review/review.page').then(m => m.ReviewPage)
      }
    ]
  },
  { path: 'errorpage', component: ErrorPage },
  { path: '**', redirectTo: 'errorpage' }
];

export default routes