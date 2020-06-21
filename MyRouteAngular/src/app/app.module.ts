import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInteceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlanRouteComponent } from './home/plan-route/plan-route.component';
import { UserInfoComponent } from './home/user-info/user-info.component';
import { GooglePlaceAutocompleteComponent } from './home/plan-route/components/google-places-autocomplete/google-places.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateRouteComponent } from './home/plan-route/components/create-route/create-route.component';
import { AddRouteWaypointComponent } from './home/plan-route/components/add-route-waypoint/add-route-waypoint.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { VarDirective } from './home/plan-route/components/create-route/var.directive';

import { DeleteRouteDialogComponent } from './home/plan-route/components/dialogs/delete-route-dialog/delete-route-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    MainComponent,
    PlanRouteComponent,
    UserInfoComponent,
    GooglePlaceAutocompleteComponent,
    CreateRouteComponent,
    AddRouteWaypointComponent,
    VarDirective,
    DeleteRouteDialogComponent
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatDialogModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    FormsModule,
    NgbModule
  ],
  
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInteceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
