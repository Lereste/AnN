import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-login',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('signup') signUp!: ElementRef<any>;
  // @ViewChild('forgotPassword') forgotPassword?: ElementRef<any>;
  @ViewChild('login') login!: ElementRef<any>;

  private signUpNativeElement: any;
  private forgotPasswordNativeElement: any;
  private loginNativeElement: any;

  isForgotPassword: boolean = false;
  isHideForgotPassword: boolean = true;

  constructor() {
    afterNextRender(() => {
      this.signUpNativeElement = this.signUp.nativeElement;
      // this.forgotPasswordNativeElement = this.forgotPassword?.nativeElement;
      this.loginNativeElement = this.login.nativeElement;
    });

  }

  get LoginTitle(): string {
    return this.isForgotPassword ? 'Quên mật khẩu' : 'Đăng nhập';
  }

  toggleLogin(event: any): void {
    this.isForgotPassword != this.isForgotPassword;

    let parent = event.target.parentNode;
    if (parent && this.signUpNativeElement && this.loginNativeElement) {
      Array.from(parent.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add('slide-up');
        } else {
          if (this.signUpNativeElement && this.signUpNativeElement.parentNode) {
            this.signUpNativeElement.parentNode.parentNode.classList.add('slide-up');
          }
          parent.classList.remove('slide-up');
        }
      });
    }

    this.isHideForgotPassword = !parent.classList.contains('slide-up');
  }

  toggleSignUp(event: any) {
    let parent = event.target.parentNode.parentNode;

    if (parent && this.signUpNativeElement && this.loginNativeElement) {
      Array.from(parent.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add('slide-up');
        } else {
          if (this.loginNativeElement && this.loginNativeElement.parentNode) {
            this.loginNativeElement.parentNode.classList.add('slide-up');
          }
          parent.classList.remove('slide-up');
        }
      });
    }

    this.isHideForgotPassword = parent.classList.contains('slide-up');
  }

  onForgotPassword(): void {
    this.isForgotPassword = true
  }

  onLogin(): void {

  }

  backToLogin(): void {
    console.log('click')
    this.isForgotPassword = false;
  }
}
