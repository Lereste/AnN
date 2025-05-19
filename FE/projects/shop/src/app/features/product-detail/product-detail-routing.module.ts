import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductDetailComponent } from "./product-detail.component";

export const PRODUCT_DETAIL_ROUTES: Routes = [
    {
        path: "",
        component: ProductDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(PRODUCT_DETAIL_ROUTES)],
    exports: [RouterModule],
})
export class ProductDetailRoutingModule { }
