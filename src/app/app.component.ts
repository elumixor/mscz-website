import { isPlatformBrowser } from "@angular/common";
import { Component, NgZone, PLATFORM_ID, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { FooterComponent, OverlayComponent } from "@components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, FooterComponent, OverlayComponent],
    templateUrl: "./app.component.html",
})
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
            gsap.registerPlugin(ScrollToPlugin);
        });
    }
}
