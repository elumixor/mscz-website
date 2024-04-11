import { Component } from "@angular/core";
import { WithIconComponent } from "@components";

@Component({
    selector: "app-hero",
    standalone: true,
    imports: [WithIconComponent],
    templateUrl: "./hero.component.html",
    styleUrl: "./hero.component.scss",
})
export class HeroComponent {
    buttonPressed = false;
}
