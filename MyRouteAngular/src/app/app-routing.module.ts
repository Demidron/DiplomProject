import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PlanRouteComponent } from './home/plan-route/plan-route.component';
import { UserInfoComponent } from './home/user-info/user-info.component';

const routes: Routes = [

  {path:'',redirectTo:'/home/plan-route',pathMatch:'full'},
  {
    path:'user', component:UserComponent,
    children:[
      { path:'registration',component:RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path:'home', component:HomeComponent,
    children:[
      { path:'plan-route',component:PlanRouteComponent },
      { path: 'user-info', component: UserInfoComponent,canActivate:[AuthGuard],data :{permittedRoles:['Admin','Traveler']} }
    ]
  },
  //{path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},

  {path:'forbidden',component:ForbiddenComponent},
  {path:'adminpanel',component:AdminPanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
