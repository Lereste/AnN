import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./cart.component";

export const CART_ROUTES: Routes = [
    {
        path: "",
        component: CartComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(CART_ROUTES)],
    exports: [RouterModule],
})
export class CartRoutingModule { }
