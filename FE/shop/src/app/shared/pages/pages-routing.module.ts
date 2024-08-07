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
                loadChildren: () => import('./home/home.module').then((module) => module.HomeModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('./contact/contact-routing.module').then((route) => route.CONTACT_ROUTES)
            },
            {
                path: "product-detail/:productSlug",
                loadChildren: () => import('./product-detail/product-detail-routing.module').then((route) => route.PRODUCT_DETAIL_ROUTES)
            },
            {
                path: "**",
                loadChildren: () => import('../../authentication/page404/page404-routing.module').then((route) => route.PAGE404_ROUTES)
            },
        ]
    },
    // {
    //     path: "**",
    //     component: Page404Component
    // }
];
// Page404RoutingModule

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
