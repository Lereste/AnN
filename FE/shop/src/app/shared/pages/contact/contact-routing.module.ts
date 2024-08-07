import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactComponent } from "./contact.component";

export const CONTACT_ROUTES: Routes = [
    {
        path: "",
        component: ContactComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(CONTACT_ROUTES)],
    exports: [RouterModule],
})
export class ContactRoutingModule { }
