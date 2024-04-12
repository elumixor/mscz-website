import { NgTemplateOutlet } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-feature",
    standalone: true,
    imports: [NgTemplateOutlet],
    templateUrl: "./feature.component.html",
    styleUrl: "./feature.component.scss",
})
export class FeatureComponent {
    @Input() image?: string;
}
