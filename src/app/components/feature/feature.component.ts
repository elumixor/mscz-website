import { NgTemplateOutlet, isPlatformBrowser } from "@angular/common";
import { Component, ElementRef, Input, PLATFORM_ID, ViewChild, inject, type AfterViewInit } from "@angular/core";
import { gsap } from "gsap";

@Component({
    selector: "app-feature",
    standalone: true,
    imports: [NgTemplateOutlet],
    templateUrl: "./feature.component.html",
    styleUrl: "./feature.component.scss",
})
export class FeatureComponent implements AfterViewInit {
    @Input({ required: true }) image!: string;
    @Input() alternate = false;

    @ViewChild("img") private readonly img!: ElementRef<HTMLElement>;
    @ViewChild("title") private readonly title!: ElementRef<HTMLElement>;
    @ViewChild("description") private readonly description!: ElementRef<HTMLElement>;
    @ViewChild("section") private readonly section!: ElementRef<HTMLElement>;

    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    get factor() {
        return this.alternate ? -1 : 1;
    }

    ngAfterViewInit() {
        if (!this.isBrowser) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.section.nativeElement,
                start: "0% 60%",
                end: "60% 30%",
                scrub: true,
                // markers: true,
            },
        });

        tl.fromTo(
            this.title.nativeElement,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 2,
            },
        )
            .to(this.title.nativeElement, {
                duration: 4,
                opacity: 1,
            })
            .to(this.title.nativeElement, {
                duration: 1,
                opacity: 0,
            });

        gsap.fromTo(
            this.description.nativeElement,
            {
                opacity: 0,
                y: 10 * this.factor,
                x: 10 * this.factor,
            },
            {
                scrollTrigger: {
                    trigger: this.img.nativeElement,
                    start: "20% 50%",
                    end: "70% 50%",
                    scrub: true,
                },
                x: 0,
                y: 0,
                opacity: 1,
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
                    scrub: true,
                },
                x: 0,
                opacity: 1,
            },
        );
    }
}
