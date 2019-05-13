import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppRoutes } from './app.routing';
import { PageContentComponent } from './core/page-content/page-content.component';
import { LoginComponent } from './accounts/login/login.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

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
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    LoadingBarRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
