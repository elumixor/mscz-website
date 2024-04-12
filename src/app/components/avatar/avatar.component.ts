import { Component, Input } from "@angular/core";
import { ImageComponent } from "@components/image/image.component";

@Component({
    selector: "app-avatar",
    standalone: true,
    imports: [ImageComponent],
    templateUrl: "./avatar.component.html",
    styleUrl: "./avatar.component.scss",
})
export class AvatarComponent {
    @Input({ required: true }) image!: string;
    @Input({ required: true }) name!: string;
}
