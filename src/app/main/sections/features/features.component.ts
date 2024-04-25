import { Component } from "@angular/core";
import { AccordionComponent, FeatureComponent, ImageComponent } from "@components";
import { PlaceComponent } from "./place/place.component";
import { TrainerComponent } from "./trainer/trainer.component";
import { CardComponent } from "@components/card/card.component";

@Component({
    selector: "app-features",
    standalone: true,
    imports: [TrainerComponent, FeatureComponent, CardComponent, PlaceComponent, ImageComponent, AccordionComponent],
    templateUrl: "./features.component.html",
    styleUrl: "./features.component.scss",
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FeaturesComponent {}
