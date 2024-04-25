import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "app-horizontal-section",
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: flex;
                justify-content: space-between;
                overflow-x: scroll;

                -ms-overflow-style: none;
                scrollbar-width: none;

                &::-webkit-scrollbar {
                    display: none;
                }
            }
        `,
    ],
})
export class HorizontalSectionComponent {
    @HostBinding("style.gap.rem")
    @Input()
    gap?: number;
}
