import { isPlatformBrowser } from "@angular/common";
import { Component, NgZone, PLATFORM_ID, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, FooterComponent],
    templateUrl: "./app.component.html",
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppComponent {
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly ngZone = inject(NgZone);
    private readonly titleService = inject(Title);
    constructor() {
        this.titleService.setTitle("MeditationSteps.cz");

        if (!this.isBrowser) return;

        this.ngZone.runOutsideAngular(() => {
            document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);

            document.addEventListener("resize", () =>
                document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`),
            );

            // window.onbeforeunload = () => window.scrollTo(0, 0);

            gsap.registerPlugin(ScrollTrigger);
        });
    }
}
