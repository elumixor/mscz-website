import { Component, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { IconComponent } from "@components";
import {
    ContactsComponent,
    CtaComponent,
    FaqComponent,
    FeaturesComponent,
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
        FeaturesComponent,
        ReviewsComponent,
        PreviousRetreatComponent,
        StatsComponent,
        FaqComponent,
        CtaComponent,
        ContactsComponent,
        IconComponent,
    ],
    templateUrl: "./retreat-2.component.html",
    styleUrl: "./retreat-2.component.scss",
})
export class Retreat2Component {
    private readonly title = inject(Title);

    constructor() {
        this.title.setTitle("Retreat in May | MeditationSteps.cz");
    }
}
