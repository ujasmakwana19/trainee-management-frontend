import { Routes } from '@angular/router';
import { AuthPage } from './features/auth/auth.page';
import { ErrorPage } from './features/errorpage/errorpage.page';
import { authGuard } from './core/guards/auth.guards';
import { MainLayout } from './layouts/main.page';
import {RoutePath} from './core/route.constant';

const routes: Routes = [
  { 
    path: RoutePath.AUTH, 
    component: AuthPage 
  },
  {
    path: '',
    component: MainLayout,
    canActivateChild: [authGuard],
    children: [
      { 
        path: '', 
        redirectTo: RoutePath.HOME, 
        pathMatch: 'full' 
      },
      { 
        path: RoutePath.HOME, 
        loadComponent: () => import('./features/home/home.page').then(m => m.HomePage)
      },
      { 
        path: RoutePath.USER_PROFILE_BASE, 
        loadComponent: () => import('./features/userprofile/userprofile.page').then(m => m.UserProfilePage)
      },
      { 
        path: RoutePath.TRAINEE_BASE, 
        loadComponent: () => import('./features/trainee/trainee.page').then(m => m.TraineePage),
      },
      { 
        path: RoutePath.MENTOR_BASE, 
        loadComponent: () => import('./features/mentor/mentor.page').then(m => m.MentorPage)
      },
      { 
        path: RoutePath.SUBMISSION_BASE, 
        loadComponent: () => import('./features/submission/submission.page').then(m => m.SubmissionPage)
      },
      {
        path : RoutePath.TASK_BASE,
        loadComponent : () => import('./features/task/task.page').then(m => m.TaskPage)
      },
      {
        path:RoutePath.REVIEW_BASE,
        loadComponent : () => import('./features/review/review.page').then(m => m.ReviewPage)
      }
    ]
  },
  { path: RoutePath.ERROR_BASE, component: ErrorPage },
  { path: '**', redirectTo: RoutePath.ERROR_BASE }
];

export default routes