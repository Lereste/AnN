import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
    {
        path: "", // Matches any URL that has an empty path (e.g., the root URL "/")
        redirectTo: "", // Redirects to another route (which is not specified in this example)
        pathMatch: "full", // Only matches the route if the entire URL path matches the defined `path`
    },
    {
        path: '',
        loadChildren: () => import('./shared/pages/pages.module').then((m) => m.PagesModule)
    },
    {
        path: "**",
        loadChildren: () => import('./authentication/page404/page404-routing.module').then((route) => route.PAGE404_ROUTES)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
