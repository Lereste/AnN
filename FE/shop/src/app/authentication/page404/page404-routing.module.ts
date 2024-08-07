import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./page404.component";

export const PAGE404_ROUTES: Routes = [
    {
        path: "",
        component: Page404Component,
    },
];

@NgModule({
    imports: [RouterModule.forChild(PAGE404_ROUTES)],
    exports: [RouterModule],
})
export class Page404RoutingModule { }
