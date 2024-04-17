import { Component, HostBinding, HostListener } from "@angular/core";

@Component({
    selector: "app-button",
    standalone: true,
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss",
})
export class ButtonComponent {
    @HostBinding("class.pressed")
    pressed = false;

    @HostListener("pointerdown")
    onPointerDown() {
        this.pressed = true;
    }

    @HostListener("pointerup")
    onPointerUp() {
        this.pressed = false;
    }
}
