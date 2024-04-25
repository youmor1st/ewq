import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ProfileComponent } from './profile/profile.component';
import { WhoCreatedComponent } from './who-created/who-created.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { CourseComponent } from './course/course.component';
import { EventComponent } from './event/event.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    VacancyComponent,
    ProfileComponent,
    WhoCreatedComponent,
    LoginComponent,
    SignUpComponent,
    CompanyComponent,
    CourseComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
