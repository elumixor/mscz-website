import { NgTemplateOutlet, isPlatformBrowser } from "@angular/common";
import {
    Component,
    ElementRef,
    Input,
    PLATFORM_ID,
    QueryList,
    ViewChild,
    ViewChildren,
    inject,
    type AfterViewInit,
} from "@angular/core";
import { gsap } from "gsap";

@Component({
    selector: "app-feature",
    standalone: true,
    imports: [NgTemplateOutlet],
    templateUrl: "./feature.component.html",
    styleUrl: "./feature.component.scss",
})
export class FeatureComponent implements AfterViewInit {
    @Input()
    side: "left" | "right" | "center" = "right";
    @Input() height = 15;
    @Input() additionalHeight = 0;
    @Input() backgroundSize = 0.7;
    @Input() fullHeight = false;
    @Input() fullWidth = false;
    @Input() labelsOpacity = 1;

    @ViewChild("img") private readonly img!: ElementRef<HTMLElement>;
    @ViewChild("underlay") private readonly underlay!: ElementRef<HTMLElement>;
    @ViewChild("title") private readonly title!: ElementRef<HTMLElement>;
    @ViewChild("space") private readonly space!: ElementRef<HTMLElement>;
    @ViewChildren("content") private readonly content!: QueryList<ElementRef<HTMLElement>>;

    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly element = inject(ElementRef).nativeElement as HTMLElement;

    get factor() {
        return this.side === "left" ? -1 : 1;
    }

    get backgroundHeight() {
        return `calc(var(--app-height) * ${this.backgroundSize} - 1rem)`;
    }

    get spaceHeight() {
        return this.fullHeight
            ? `calc(var(--app-height) * ${this.backgroundSize} + ${this.additionalHeight - 5}rem)`
            : `${this.height}rem`;
    }

    ngAfterViewInit() {
        if (!this.isBrowser) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.space.nativeElement,
                start: "15% 60%",
                end: "100% 30%",
                scrub: 0.5,
            },
        });

        tl.fromTo(
            this.title.nativeElement,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 1,
            },
        )
            .to(this.title.nativeElement, {
                duration: 8,
                opacity: 1,
            })
            .to(this.title.nativeElement, {
                duration: 2,
                opacity: 0,
            });

        gsap.timeline({
            scrollTrigger: {
                trigger: this.element,
                start: "0% 60%",
                end: "100% 30%",
                scrub: 0.5,
            },
        })
            .fromTo(
                this.underlay.nativeElement,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 1,
                },
            )
            .to(this.underlay.nativeElement, {
                duration: 1,
                opacity: 1,
            })
            .to(this.underlay.nativeElement, {
                duration: 1,
                opacity: 0,
            });

        gsap.fromTo(
            this.content
                .toArray()
                .reverse()
                .map((e) => e.nativeElement),
            {
                opacity: 0,
                x: 10 * this.factor,
                y: 10,
            },
            {
                scrollTrigger: {
                    trigger: this.img.nativeElement,
                    start: "20% 50%",
                    end: "100% 100%",
                    scrub: 2,
                },
                x: 0,
                y: 0,
                opacity: 1,
                stagger: 0.2,
            },
        );

        gsap.fromTo(
            this.img.nativeElement,
            {
                x: -50 * this.factor,
                opacity: 0,
            },
            {
                scrollTrigger: {
                    trigger: this.img.nativeElement,
                    start: "-25% 50%",
                    end: "10% 50%",
                    scrub: 1,
                },
                x: 0,
                opacity: 1,
            },
        );
    }
}
