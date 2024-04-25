import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileComponent } from './profile/profile.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { WhoCreatedComponent } from './who-created/who-created.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CompanyComponent } from './company/company.component';
import { CourseComponent } from './course/course.component';
import { EventComponent } from './event/event.component';
const routes: Routes = [
  {path:'',component:MainPageComponent,children:[
    {path:'',redirectTo:'/',pathMatch:'full'},
    {path:'',component:VacancyComponent},
    { path:'profile',component:ProfileComponent,},
    { path:'companies',component:CompanyComponent},
      { path:'courses',component:CourseComponent},
      { path:'events',component:EventComponent},
  ],
  },
  { path:'login',component:LoginComponent},
  { path:'sign-up',component:SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
