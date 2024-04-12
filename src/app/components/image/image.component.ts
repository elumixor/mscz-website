import { Component, Input } from "@angular/core";

@Component({
    selector: "app-image",
    standalone: true,
    imports: [],
    templateUrl: "./image.component.html",
    styleUrl: "./image.component.scss",
})
export class ImageComponent {
    @Input({ required: true }) src!: string;
    @Input() x = 0;
    @Input() y = 0;
    @Input() fit?: "cover" | "contain" = "cover";
    @Input() scale = 1;

    get transform() {
        return `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
}
