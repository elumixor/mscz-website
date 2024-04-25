import type { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

export const routes: Routes = [
    {
        path: "retreats/2",
        component: MainComponent,
    },
    {
        path: "**",
        redirectTo: "retreats/2",
        pathMatch: "full",
    },
];
