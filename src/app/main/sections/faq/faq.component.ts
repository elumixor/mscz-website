import { Component } from "@angular/core";
import { AccordionComponent } from "@components";

@Component({
    selector: "app-faq",
    standalone: true,
    imports: [AccordionComponent],
    templateUrl: "./faq.component.html",
    styleUrl: "./faq.component.scss",
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FaqComponent {}
