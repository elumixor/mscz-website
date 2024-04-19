import { isPlatformBrowser } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, PLATFORM_ID, inject, type OnChanges } from "@angular/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: "app-tab",
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                overflow: hidden;
            }
        `,
    ],
})
export class TabComponent implements OnChanges {
    @Input() isOpen = false;
    @Input() duration = 0.3;
    @Output() readonly animated = new EventEmitter();
    private readonly element = inject(ElementRef).nativeElement as HTMLElement;
    private tween?: gsap.core.Tween;
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    ngOnChanges() {
        if (!this.isBrowser) return;

        this.tween?.kill();
        this.tween = gsap.to(this.element, {
            "max-height": this.isOpen ? this.element.scrollHeight : 0,
            duration: this.duration,
            onUpdate: () => ScrollTrigger.refresh(),
            onComplete: () => this.animated.emit(),
        });
    }
}
