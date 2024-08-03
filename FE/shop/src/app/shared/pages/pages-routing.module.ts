import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { PagesComponent } from "./pages.component";

export const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
            },
            {
                path: 'login',
                loadChildren: () => import('../../authentication/authentication.module').then((m) => m.AuthenticationModule)
            }
        ]
    },
    // {
    //     path: "home",
    //     component: MainComponent,
    // },
    // {
    //     path: 'home',
    //     loadChildren: () => import('../../layout/main/main.module').then((m) => m.MainModule)
    // },
    // {
    //     path: 'login',
    //     loadChildren: () => import('../../../authentication/authentication.module').then((m) => m.AuthenticationModule)
    // },
    // // {
    // //     path: "**",
    // //     component: Page404Component,
    // // },
    // {
    //     path: '**',
    //     loadComponent: () => import('../../../authentication/page404/page404.component').then((c) => c.Page404Component)
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
