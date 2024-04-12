import { Component } from "@angular/core";
import { AccordionContentComponent } from "@components/accordion-content/accordion-content.component";

@Component({
    selector: "app-accordion",
    standalone: true,
    imports: [AccordionContentComponent],
    templateUrl: "./accordion.component.html",
    styleUrl: "./accordion.component.scss",
})
export class AccordionComponent {
    isOpen = false;
}
