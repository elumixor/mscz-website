import { Component } from "@angular/core";
import { HorizontalSectionComponent, ReviewComponent, type IReview } from "@components";

@Component({
    selector: "app-reviews",
    standalone: true,
    imports: [ReviewComponent, HorizontalSectionComponent],
    templateUrl: "./reviews.component.html",
    styleUrl: "./reviews.component.scss",
})
export class ReviewsComponent {
    readonly reviews: IReview[] = [
        {
            image: "assets/images/people/dada-sadananda.png",
            text: "I have been to many retreats, but this one was the best. The location was perfect, the food was amazing, and the teachers were so knowledgeable. I can't wait to go back!",
            name: "Dada Sadananda",
        },
        {
            image: "assets/images/people/dada-sadananda.png",
            text: "I have been to many retreats, but this one was the best. The location was perfect, the food was amazing, and the teachers were so knowledgeable. I can't wait to go back!",
            name: "Dada Sadananda",
        },
        {
            image: "assets/images/people/dada-sadananda.png",
            text: "I have been to many retreats, but this one was the best. The location was perfect, the food was amazing, and the teachers were so knowledgeable. I can't wait to go back!",
            name: "Dada Sadananda",
        },
        {
            image: "assets/images/people/dada-sadananda.png",
            text: "I have been to many retreats, but this one was the best. The location was perfect, the food was amazing, and the teachers were so knowledgeable. I can't wait to go back!",
            name: "Dada Sadananda",
        },
        {
            image: "assets/images/people/dada-sadananda.png",
            text: "I have been to many retreats, but this one was the best. The location was perfect, the food was amazing, and the teachers were so knowledgeable. I can't wait to go back!",
            name: "Dada Sadananda",
        },
    ];
}
