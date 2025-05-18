import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';


export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    component: AccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ACCOUNT_ROUTES)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }