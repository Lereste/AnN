import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  exports: [
    // LoginComponent
  ],
  declarations: [
    // LoginComponent
  ],
  providers: [
  ],
})
export class AuthenticationModule { }