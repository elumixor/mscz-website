import { isPlatformBrowser } from "@angular/common";
import {
    Component,
    ElementRef,
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

    @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
    @ViewChild("videoContainer") videoContainer!: ElementRef<HTMLDivElement>;
    @ViewChild("content") content!: ElementRef<HTMLDivElement>;
    @ViewChild("videoOverlay") videoOverlay!: ElementRef<HTMLDivElement>;
    @ViewChildren("priceHint") priceHint!: QueryList<ElementRef<HTMLDivElement>>;

    ngAfterViewInit() {
        if (!this.isBrowser) return;

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
    }
}
