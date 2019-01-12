import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";
import { HttpModule } from "@angular/http";
// import { Http, Headers } from "@angular/http";
import { ErrorComponent } from './error/error.component';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchPipe } from './search.pipe';
import { LoginGuard } from "./login.guard";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './home/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    HomeComponent,
    SearchPipe,
    CardComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }, {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'register',
      component: RegistrationComponent
    }, {
      path: 'home',
      component: HomeComponent,
      canActivate: [LoginGuard]
    }, {
      path: '**',
      component: ErrorComponent
    }])
  ],
  providers: [
    LoginService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
