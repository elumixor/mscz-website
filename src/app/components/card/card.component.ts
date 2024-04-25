import { NgTemplateOutlet } from "@angular/common";
import { Component, ElementRef, HostBinding, Input, NgZone, inject, type AfterViewInit } from "@angular/core";
import { BorderedComponent } from "@components/bordered/bordered.component";
import { isBrowser } from "@utils";
import { gsap } from "gsap";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [BorderedComponent, NgTemplateOutlet],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
})
export class CardComponent implements AfterViewInit {
    @HostBinding("class")
    @Input()
    side: "left" | "right" | "center" = "right";

    @HostBinding("class.bordered")
    @Input()
    bordered = true;

    @Input() adjust = false;

    private readonly isBrowser = isBrowser();
    private readonly zone = inject(NgZone);
    private readonly element = inject(ElementRef).nativeElement as HTMLElement;

    ngAfterViewInit() {
        if (!this.isBrowser) return;
        this.zone.runOutsideAngular(() => this.initAnimations());
    }

    private initAnimations() {
        gsap.fromTo(
            this.element,
            {
                opacity: 0,
                scale: 0.95,
            },
            {
                scrollTrigger: {
                    trigger: this.element,
                    start: "top 80%",
                    end: "bottom 10%",
                    toggleActions: "play none none none",
                },
                opacity: 1,
                scale: 1,
                delay: 0.25,
                duration: 0.5,
            },
        );
    }
}
