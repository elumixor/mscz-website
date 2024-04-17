import { isPlatformBrowser } from "@angular/common";
import {
    Component,
    ElementRef,
    NgZone,
    PLATFORM_ID,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    inject,
    type AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TabComponent, OverlayComponent, ButtonComponent } from "@components";
import { NetworkService } from "@services";
import { gsap } from "gsap";

@Component({
    selector: "app-cta",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, TabComponent, ButtonComponent],
    templateUrl: "./cta.component.html",
    styleUrl: "./cta.component.scss",
})
export class CtaComponent implements AfterViewInit {
    @ViewChild("formRef") private readonly formRef!: ElementRef<HTMLElement>;
    @ViewChild("fixedContainer") private readonly fixedContainer!: ElementRef<HTMLElement>;
    @ViewChild("submit", { read: ElementRef }) private readonly submit!: ElementRef<HTMLElement>;
    @ViewChild("scroller") private readonly scroller!: ElementRef<HTMLElement>;
    @ViewChild("popup", { read: TemplateRef }) private readonly popup!: TemplateRef<unknown>;
    @ViewChildren("price") private readonly price!: QueryList<ElementRef<HTMLElement>>;
    @ViewChild("priceContainer") private readonly priceContainer!: ElementRef<HTMLElement>;

    readonly overlay = inject(OverlayComponent);
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly ngZone = inject(NgZone);
    private readonly formBuilder = inject(FormBuilder);
    private readonly network = inject(NetworkService);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    readonly email = new FormControl("", [Validators.required, Validators.email]);
    readonly form = this.formBuilder.group({
        email: this.email,
    });

    onSubmit() {
        this.form.markAsTouched();
        if (!this.form.valid) return;

        const { value } = this.email;
        if (!value) throw new Error("Email is required");

        this.overlay.show(this.popup);

        void this.network.post("register", { email: value });
    }

    scrollToForm() {
        this.formRef.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    ngAfterViewInit() {
        if (!this.isBrowser) return;

        this.ngZone.runOutsideAngular(() => {
            gsap.fromTo(
                this.fixedContainer.nativeElement,
                {
                    opacity: 0,
                    y: 10,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    // delay: 1.5,
                },
            );

            const priceElements = this.price
                .toArray()
                .map((e) => e.nativeElement)
                .reverse();

            gsap.fromTo(
                this.priceContainer.nativeElement,
                {
                    opacity: 1,
                    y: 0,
                },
                {
                    scrollTrigger: {
                        trigger: this.scroller.nativeElement,
                        start: "top 60%",
                        end: "bottom 40%",
                        scrub: true,
                    },
                    opacity: 0,
                    y: -10,
                },
            );

            gsap.fromTo(
                priceElements,
                {
                    opacity: 0,
                    y: -10,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 1.8,
                    stagger: 0.5,

                    onComplete: () => {
                        gsap.fromTo(
                            this.fixedContainer.nativeElement,
                            {
                                opacity: 1,
                                y: 0,
                                pointerEvents: "auto",
                            },
                            {
                                scrollTrigger: {
                                    trigger: this.submit.nativeElement,
                                    start: "-100% 100%",
                                    end: "top 100%",
                                    scrub: true,
                                },
                                opacity: 0,
                                y: -10,
                                pointerEvents: "none",
                            },
                        );
                    },
                },
            );
        });
    }
}
