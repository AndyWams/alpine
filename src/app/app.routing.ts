import { Routes } from '@angular/router';
import { PageContentComponent } from './core/page-content/page-content.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './accounts/login/login.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { Error404Component } from './error/error404/error404.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: PageContentComponent,

        children: [
            {path: '',
            component: BannerComponent
        },
        {
            path: 'accounts/login',
            component: LoginComponent
        },
        {
            path: 'accounts/signup',
            component: SignupComponent
        }
        ],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '404', component: Error404Component
    },
    {   path: '**',
        redirectTo: '404'}
];
