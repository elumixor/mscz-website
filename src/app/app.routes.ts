import type { Routes } from "@angular/router";
import { Retreat2Component } from "@pages";

export const routes: Routes = [
    {
        path: "retreats/2",
        component: Retreat2Component,
    },
    {
        path: "**",
        redirectTo: "retreats/2",
        pathMatch: "full",
    },
];
