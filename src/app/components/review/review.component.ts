import { Component, Input } from "@angular/core";
import { AvatarComponent } from "@components";
import type { Review } from "@domain";

@Component({
    selector: "app-review",
    standalone: true,
    imports: [AvatarComponent],
    templateUrl: "./review.component.html",
    styleUrl: "./review.component.scss",
})
export class ReviewComponent {
    @Input({ required: true }) review!: Review;

    get image() {
        return this.review.anonymous ? "assets/images/people/person.png" : `assets/images/people/${this.review.id}.png`;
    }
    get name() {
        return this.review.anonymous ? "Anonymous" : this.review.name;
    }
}
