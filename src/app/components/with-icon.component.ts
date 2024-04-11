import { Component, Input } from "@angular/core";
import { IconComponent } from "./icon.component";

@Component({
    selector: "app-with-icon",
    standalone: true,
    imports: [IconComponent],
    template: `
        @if (src) {
            <app-icon class="icon" [src]="src" />
        }

        <div class="flex-grow">
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `,
    ],
})
export class WithIconComponent {
    @Input() src?: string;
}
