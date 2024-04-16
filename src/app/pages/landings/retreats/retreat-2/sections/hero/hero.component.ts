import { isPlatformBrowser } from "@angular/common";
import {
    Component,
    ElementRef,
    NgZone,
    PLATFORM_ID,
    QueryList,
    ViewChild,
    ViewChildren,
    inject,
    type AfterViewInit,
} from "@angular/core";
import { WithIconComponent } from "@components";
import { gsap } from "gsap";

@Component({
    selector: "app-hero",
    standalone: true,
    imports: [WithIconComponent],
    templateUrl: "./hero.component.html",
    styleUrl: "./hero.component.scss",
})
export class HeroComponent implements AfterViewInit {
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly ngZone = inject(NgZone);

    @ViewChild("video") video!: ElementRef<HTMLElement>;
    @ViewChild("videoContainer") videoContainer!: ElementRef<HTMLElement>;
    @ViewChild("content") content!: ElementRef<HTMLElement>;
    @ViewChild("videoOverlay") videoOverlay!: ElementRef<HTMLElement>;
    @ViewChildren("priceHint") priceHint!: QueryList<ElementRef<HTMLElement>>;

    @ViewChild("title") title!: ElementRef<HTMLElement>;
    @ViewChild("subtitle") subtitle!: ElementRef<HTMLElement>;
    @ViewChild("ms", { read: ElementRef }) ms!: ElementRef<HTMLElement>;
    @ViewChildren("li") li!: QueryList<ElementRef<HTMLElement>>;

    ngAfterViewInit() {
        if (!this.isBrowser) return;

        this.ngZone.runOutsideAngular(() => {
            gsap.fromTo(
                this.video.nativeElement,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 1,
                },
            );

            gsap.fromTo(
                [this.title.nativeElement, this.subtitle.nativeElement],
                {
                    opacity: 0,
                    y: 10,
                },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.5,
                    delay: 0.5,
                },
            );

            gsap.fromTo(
                this.ms.nativeElement,
                {
                    opacity: 0,
                    x: -10,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: 1,
                },
            );

            gsap.fromTo(
                this.li.toArray().map((e) => e.nativeElement),
                {
                    opacity: 0,
                    y: 10,
                },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.25,
                    delay: 1.5,
                },
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.video.nativeElement,
                    start: "60% 50%",
                    end: "85% 50%",
                    scrub: true,
                    toggleActions: "play reverse play reverse",
                },
            });

            // gsap.to(this.videoContainer.nativeElement, {
            //     scrollTrigger: {
            //         trigger: this.video.nativeElement,
            //         start: "75% 50%",
            //         end: "100% 50%",
            //         scrub: true,
            //         markers: true,
            //         toggleActions: "play reverse play reverse",
            //     },
            //     opacity: 0,
            // });

            tl.to(this.content.nativeElement, {
                opacity: 0,
                y: -10,
            });

            tl.to([this.videoOverlay.nativeElement, ...this.priceHint.toArray().map((e) => e.nativeElement)], {
                opacity: 0,
            });
        });
    }
}
