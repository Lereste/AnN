import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllProductsComponent } from "./all-products.component";

export const ALL_PRODUCTS_ROUTES: Routes = [
    {
        path: "",
        component: AllProductsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ALL_PRODUCTS_ROUTES)],
    exports: [RouterModule],
})
export class AllProductsRoutingModule { }
