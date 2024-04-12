import { Component } from "@angular/core";
import { AccordionComponent } from "@components";

@Component({
    selector: "app-faq",
    standalone: true,
    imports: [AccordionComponent],
    templateUrl: "./faq.component.html",
    styleUrl: "./faq.component.scss",
})
export class FaqComponent {
    readonly questions = [
        {
            question: "What is the refund policy?",
            answer: "You can get a full refund if you cancel 24 hours before the event.",
        },
        {
            question: "What is the refund policy?",
            answer: "You can get a full refund if you cancel 24 hours before the event.",
        },
        {
            question: "What is the refund policy?",
            answer: "You can get a full refund if you cancel 24 hours before the event.",
        },
    ];
}
