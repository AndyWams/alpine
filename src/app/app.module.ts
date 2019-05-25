import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app.routing';
import { PageContentComponent } from './core/page-content/page-content.component';
import { LoginComponent } from './accounts/login/login.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {
  HttpClientModule,
    HttpClient,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { UserServiceService } from './accounts/user-service.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthGuard } from './guard/auth.guard';
import { Error404Component } from './error/error404/error404.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileContentComponent } from './profile/profile-content/profile-content.component';
import { JwtInterceptor } from './interceptor/interceptor.jwt';
import { ErrorInterceptor } from './interceptor/interceptor.error';




@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HeaderComponent,
    FooterComponent,
    PageContentComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioComponent,
    ProfileComponent,
    Error404Component,
    ProfileContentComponent,
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgbModule.forRoot(),
    LoadingBarRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule

  ],
  entryComponents: [],
  providers: [UserServiceService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
