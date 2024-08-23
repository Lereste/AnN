import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CheckOutComponent } from "./check-out.component";

export const CHECK_OUT_ROUTES: Routes = [
    {
        path: "",
        component: CheckOutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(CHECK_OUT_ROUTES)],
    exports: [RouterModule],
})
export class CheckOutRoutingModule { }
