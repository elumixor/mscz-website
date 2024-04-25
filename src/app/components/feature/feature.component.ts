import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    ViewChild,
    inject,
    type AfterViewInit,
} from "@angular/core";
import { BorderedComponent } from "@components/bordered/bordered.component";
import { isBrowser } from "@utils";
// import { gsap } from "gsap";

@Component({
    selector: "app-feature",
    standalone: true,
    imports: [BorderedComponent],
    templateUrl: "./feature.component.html",
    styleUrl: "./feature.component.scss",
})
export class FeatureComponent implements AfterViewInit {
    @Input() height = 15;
    @Input() additionalHeight = 0;
    @Input() backgroundSize = 0.7;
    @Input() fullHeight = false;
    @Input() fullWidth = false;
    @Input() labelsOpacity = 1;
    @HostBinding("class.margin-top")
    @Input()
    marginTop = true;
    @HostBinding("class.margin-bottom")
    @Input()
    marginBottom = true;

    @ViewChild("img") private readonly img!: ElementRef<HTMLElement>;
    @ViewChild("title") private readonly title!: ElementRef<HTMLElement>;
    @ViewChild("content") private readonly content!: ElementRef<HTMLElement>;

    private readonly isBrowser = isBrowser();
    private readonly ngZone = inject(NgZone);
    private readonly element = inject(ElementRef).nativeElement as HTMLElement;

    // get factor() {
    //     return this.side === "left" ? -1 : 1;
    // }

    // get backgroundHeight() {
    //     return `calc(var(--app-height) * ${this.backgroundSize} - 1rem)`;
    // }

    // get spaceHeight() {
    //     return this.fullHeight
    //         ? `calc(var(--app-height) * ${this.backgroundSize} + ${this.additionalHeight - 5}rem)`
    //         : `${this.height}rem`;
    // }

    ngAfterViewInit() {
        if (!this.isBrowser) return;
        this.ngZone.runOutsideAngular(() => this.initAnimations());
    }

    private initAnimations() {
        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: this.title.nativeElement,
        //         start: "0% 90%",
        //         end: "100% 5%",
        //         toggleActions: "play reverse play reverse",
        //     },
        // }).fromTo(this.title.nativeElement, { opacity: 0, x: -10 }, { opacity: 1, x: 0 });
        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: this.element,
        //         start: "20% 60%",
        //         end: "100% 5%",
        //         toggleActions: "play reverse play reverse",
        //     },
        // }).fromTo(this.img.nativeElement, { opacity: 0, x: -10 }, { opacity: 1, x: 0 }, 0.2);
        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: this.content.nativeElement,
        //         start: "0% 90%",
        //         end: "100% 10%",
        //         toggleActions: "play reverse play reverse",
        //     },
        // }).fromTo(this.content.nativeElement, { opacity: 0, x: 10, y: 10 }, { opacity: 1, x: 0, y: 0 });
    }
}
