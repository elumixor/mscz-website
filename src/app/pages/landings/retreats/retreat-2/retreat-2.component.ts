import { Component } from "@angular/core";
import {
    BenefitsComponent,
    ContactsComponent,
    CtaComponent,
    FaqComponent,
    HeroComponent,
    PreviousRetreatComponent,
    ReviewsComponent,
    StatsComponent,
} from "./sections";

@Component({
    selector: "app-retreat-2",
    standalone: true,
    imports: [
        HeroComponent,
        BenefitsComponent,
        ReviewsComponent,
        PreviousRetreatComponent,
        StatsComponent,
        FaqComponent,
        CtaComponent,
        ContactsComponent,
    ],
    templateUrl: "./retreat-2.component.html",
    styleUrl: "./retreat-2.component.scss",
})
export class Retreat2Component {}
