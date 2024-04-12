import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-accordion-content",
    standalone: true,
    imports: [],
    templateUrl: "./accordion-content.component.html",
    styleUrl: "./accordion-content.component.scss",
})
export class AccordionContentComponent {
    @Input() isOpen = false;
    @Output() readonly isOpenChange = new EventEmitter<boolean>();
}
