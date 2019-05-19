import { Routes } from '@angular/router';
import { PageContentComponent } from './core/page-content/page-content.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './accounts/login/login.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

export const AppRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    },
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
];
