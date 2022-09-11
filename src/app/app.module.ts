import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterUserComponent } from './user-components/register-user/register-user.component';
import { AuthErrorInterceptor } from './_security/auth.error.interceptor';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';
import { EditUserComponent } from './user-components/edit-user/edit-user.component';
import { BonsaiDetailComponent } from './plant-components/user-bonsai-list/bonsai-detail/bonsai-detail.component';
import { RouterModule } from '@angular/router';
import { UserBonsaiListComponent } from './plant-components/user-bonsai-list/user-bonsai-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterUserComponent,
    UserProfileComponent,
    EditUserComponent,
    BonsaiDetailComponent,
    UserBonsaiListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
