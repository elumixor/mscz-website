import { Component, ElementRef, Input, NgZone, ViewChild, inject, type AfterViewInit } from "@angular/core";
import { BorderedComponent } from "@components/bordered/bordered.component";
import { isBrowser } from "@utils";
import { gsap } from "gsap";

@Component({
    selector: "app-image",
    standalone: true,
    imports: [BorderedComponent],
    templateUrl: "./image.component.html",
    styleUrl: "./image.component.scss",
})
export class ImageComponent implements AfterViewInit {
    @Input({ required: true }) src!: string;
    @Input() x = 0;
    @Input() y = 0;
    @Input() fit?: "cover" | "contain" = "cover";
    @Input() scale = 1;

    @Input() bordered = false;
    @Input() animated = false;

    @ViewChild("img") private readonly img!: ElementRef<HTMLElement>;

    private readonly isBrowser = isBrowser();
    private readonly ngZone = inject(NgZone);

    get transform() {
        return `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }

    ngAfterViewInit() {
        if (!this.isBrowser) return;
        if (this.animated) this.ngZone.runOutsideAngular(() => this.initAnimations());
    }

    initAnimations() {
        gsap.fromTo(
            this.img.nativeElement,
            {
                scale: 1.3,
            },
            {
                scrollTrigger: {
                    trigger: this.img.nativeElement,
                    scrub: 1,
                },
                scale: 1,
            },
        );
    }
}
