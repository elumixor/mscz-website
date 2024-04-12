import { Component } from "@angular/core";
import { FeatureComponent } from "@components";

@Component({
    selector: "app-features",
    standalone: true,
    imports: [FeatureComponent],
    templateUrl: "./features.component.html",
    styleUrl: "./features.component.scss",
})
export class FeaturesComponent {}
