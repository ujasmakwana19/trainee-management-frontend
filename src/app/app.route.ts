import { Routes } from '@angular/router';
import { AuthPage } from './features/auth/auth.page';
import { ErrorPage } from './features/errorpage/errorpage.page';
import { authGuard } from './core/guards/auth.guards';
import { MainLayout } from './layouts/main.page';
import {RoutePath} from './core/route.constant';
import { routeGuard } from './core/guards/routeAuthorization.guard';

const routes: Routes = [
  { 
    path: RoutePath.AUTH, 
    component: AuthPage 
  },
  {
    path: 'ram',
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
        path: RoutePath.USERPROFILEBASE, 
        loadComponent: () => import('./features/userprofile/userprofile.page').then(m => m.UserProfilePage)
      },
      { 
        path: RoutePath.TRAINEEBASE, 
        loadComponent: () => import('./features/trainee/trainee.page').then(m => m.TraineePage),
        canActivate : [routeGuard]
      },
      { 
        path: RoutePath.MENTORBASE, 
        loadComponent: () => import('./features/mentor/mentor.page').then(m => m.MentorPage)
      },
      { 
        path: RoutePath.SUBMISSIONBASE, 
        loadComponent: () => import('./features/submission/submission.page').then(m => m.SubmissionPage)
      },
      {
        path : RoutePath.TASKBASE,
        loadComponent : () => import('./features/task/task.page').then(m => m.TaskPage)
      },
      {
        path:RoutePath.REVIEWBASE,
        loadComponent : () => import('./features/review/review.page').then(m => m.ReviewPage)
      }
    ]
  },
  { path: RoutePath.ERRORPAGE, component: ErrorPage },
  { path: '**', redirectTo: RoutePath.ERRORPAGE }
];

export default routes