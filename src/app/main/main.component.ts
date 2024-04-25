import { Component, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { IconComponent } from "@components";
import {
    ContactsComponent,
    CtaComponent,
    FaqComponent,
    FeaturesComponent,
    HeroComponent,
    ReviewsComponent,
} from "./sections";

@Component({
    selector: "app-main",
    standalone: true,
    imports: [
        HeroComponent,
        FeaturesComponent,
        ReviewsComponent,
        FaqComponent,
        CtaComponent,
        ContactsComponent,
        IconComponent,
    ],
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.scss",
})
export class MainComponent {
    private readonly title = inject(Title);

    constructor() {
        this.title.setTitle($localize`Retreat in May | MeditationSteps.cz`);
    }

    readonly place = {
        lat: 49.7245819,
        long: 16.0503658,
        zoom: 9,
        title: "Rekreační středisko Naděje",
        description: "Svratouch 306",
    };
}
