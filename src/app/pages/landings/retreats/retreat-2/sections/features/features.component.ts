import { Component } from "@angular/core";
import { FeatureComponent } from "@components";
import { PlaceComponent } from "./place/place.component";
import { TrainerComponent } from "./trainer/trainer.component";

@Component({
    selector: "app-features",
    standalone: true,
    imports: [TrainerComponent, FeatureComponent, PlaceComponent],
    templateUrl: "./features.component.html",
    styleUrl: "./features.component.scss",
})
export class FeaturesComponent {
    readonly placeImages = [
        "assets/images/retreats/2/place.png",
        "assets/images/retreats/2/place-2.png",
        "assets/images/retreats/2/place-4.png",
        "assets/images/retreats/2/place-3.png",
    ];
}
