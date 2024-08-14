import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllArticlesComponent } from "./all-articles.component";

export const ALL_ARTICLES_ROUTES: Routes = [
    {
        path: "",
        component: AllArticlesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ALL_ARTICLES_ROUTES)],
    exports: [RouterModule],
})
export class AllArticlesRoutingModule { }
