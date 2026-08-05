import { Routes } from '@angular/router';
import { AuthPage } from './features/auth/auth.page';
import { ErrorPage } from './features/errorpage/errorpage.page';
import { authGuard } from './core/guards/auth.guards';
import { MainLayout } from './layouts/main.page';
import {RoutePath} from './core/route.constant';
import { PermissionKey } from './core/permission.constant';

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
        loadComponent: () => import('./features/home/home.page').then(m => m.HomePage),
        data : {permission : PermissionKey.HOME}
      },
      { 
        path: RoutePath.USER_PROFILE_BASE, 
        loadComponent: () => import('./features/userprofile/userprofile.page').then(m => m.UserProfilePage),
        data : {permission : PermissionKey.USER_PROFILE_BASE}
      },
      { 
        path: RoutePath.TRAINEE_BASE, 
        loadComponent: () => import('./features/trainee/trainee.page').then(m => m.TraineePage),
        children : [
          {
            path: '', 
            loadComponent: () => import('./features/trainee/component/view/trainee.view').then(m => m.TraineeComponent),
            data: {permission : PermissionKey.TRAINEE_BASE}
          },
          {
            path: RoutePath.ADD, 
            loadComponent: () => import('./features/trainee/component/add/trainee.add').then(m => m.AddTraineeComponent),
            data: {permission : PermissionKey.TRAINEE_ADD}
          },
          {
            path: `${RoutePath.EDIT}/${RoutePath.PARMAS_ID}`, 
            loadComponent: () => import('./features/trainee/component/edit/trainee.edit').then(m => m.EditTraineeComponent),
            data: {permission : PermissionKey.TRAINEE_EDIT}
          }
          
        ]
      },
      { 
        path: RoutePath.MENTOR_BASE, 
        loadComponent: () => import('./features/mentor/mentor.page').then(m => m.MentorPage),
        data : {permission : PermissionKey.MENTOR_BASE}
      },
      { 
        path: RoutePath.SUBMISSION_BASE, 
        loadComponent: () => import('./features/submission/submission.page').then(m => m.SubmissionPage),
        data : {permission : PermissionKey.SUBMISSION_BASE}
      },
      {
        path : RoutePath.TASK_BASE,
        loadComponent : () => import('./features/task/task.page').then(m => m.TaskPage),
        data : {permission : PermissionKey.TASK_BASE}
      },
      {
        path:RoutePath.REVIEW_BASE,
        loadComponent : () => import('./features/review/review.page').then(m => m.ReviewPage),
        data : {permission : PermissionKey.REVIEW_BASE}
      }
    ]
  },
  { path: RoutePath.ERROR_BASE, component: ErrorPage },
  { path: '**', redirectTo: RoutePath.ERROR_BASE }
];

export default routes