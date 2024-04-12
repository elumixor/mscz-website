import { Component, Input } from "@angular/core";
import { AvatarComponent } from "@components/avatar/avatar.component";

export interface IReview {
    image: string;
    text: string;
    name: string;
}

@Component({
    selector: "app-review",
    standalone: true,
    imports: [AvatarComponent],
    templateUrl: "./review.component.html",
    styleUrl: "./review.component.scss",
})
export class ReviewComponent {
    @Input({ required: true }) review!: IReview;
}
