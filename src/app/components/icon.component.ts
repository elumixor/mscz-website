import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-icon",
    standalone: true,
    imports: [NgStyle],
    template: `<div [style]="style" class="icon"></div>`,
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            div {
                mask-repeat: no-repeat;
                mask-position: center;
                mask-size: contain;
                width: var(--icon-size, 1.2em);
                height: var(--icon-size, 1.2em);
                background-color: var(--fg-color, white);
            }
        `,
    ],
})
export class IconComponent {
    @Input({ required: true }) src!: string;

    get style() {
        const maskImage = `url(assets/images/${this.src})`;
        return {
            "mask-image": maskImage,
            "-webkit-mask-image": maskImage,
        };
    }
}
