import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "",
    },
    {
        path: '',
        loadChildren: () => import('./shared/pages/pages.module').then((m) => m.PagesModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
