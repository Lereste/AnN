import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { PagesComponent } from "./pages.component";
import { HttpClientModule } from "@angular/common/http";

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
                path: 'tat-ca-san-pham',
                loadChildren: () => import('./all-products/all-products-routing.module').then((route) => route.ALL_PRODUCTS_ROUTES)
            },
            {
                path: 'tat-ca-bai-viet',
                loadChildren: () => import('./all-articles/all-articles-routing.module').then((route) => route.ALL_ARTICLES_ROUTES)
            },
            {
                path: 'lien-he',
                loadChildren: () => import('./contact/contact-routing.module').then((route) => route.CONTACT_ROUTES)
            },
            {
                path: 'gio-hang',
                loadChildren: () => import('./cart/cart-routing.module').then((route) => route.CART_ROUTES)
            },
            {
                path: 'thanh-toan-gio-hang',
                loadChildren: () => import('./check-out/check-out-routing.module').then((route) => route.CHECK_OUT_ROUTES)
            },
            {
                path: "chi-tiet-san-pham/:productSlug",
                loadChildren: () => import('./product-detail/product-detail-routing.module').then((route) => route.PRODUCT_DETAIL_ROUTES)
            },
            // {
            //     path: "**",
            //     loadChildren: () => import('../../authentication/page404/page404-routing.module').then((route) => route.PAGE404_ROUTES)
            // },
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
