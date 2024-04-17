import { Component } from "@angular/core";
import { TabComponent } from "@components/tab.component";

@Component({
    selector: "app-accordion",
    standalone: true,
    imports: [TabComponent],
    templateUrl: "./accordion.component.html",
    styleUrl: "./accordion.component.scss",
})
export class AccordionComponent {
    isOpen = false;
}
