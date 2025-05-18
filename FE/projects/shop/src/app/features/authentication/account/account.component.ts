import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-account',
    imports: [LoginComponent],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

}
