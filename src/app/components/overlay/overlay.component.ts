import { NgTemplateOutlet } from "@angular/common";
import { Component, TemplateRef } from "@angular/core";

@Component({
    selector: "app-overlay",
    standalone: true,
    imports: [NgTemplateOutlet],
    templateUrl: "./overlay.component.html",
    styleUrl: "./overlay.component.scss",
})
export class OverlayComponent {
    currentPopup?: TemplateRef<unknown>;

    show(popup: TemplateRef<unknown>) {
        this.currentPopup = popup;
    }

    hide() {
        this.currentPopup = undefined;
    }
}
