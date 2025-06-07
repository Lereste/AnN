import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './page404/page404.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Page404Component },
      { path: '**', component: Page404Component }
    ])
  ]
})
export class AuthenticationModule { }
