import { isPlatformBrowser } from "@angular/common";
import { Component, PLATFORM_ID, inject } from "@angular/core";
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
    constructor() {
        if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

        gsap.registerPlugin(ScrollTrigger);

        // console.log(window.innerHeight);
        document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);

        document.addEventListener("resize", () => {
            // console.log(window.innerHeight);
            document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
        });
    }
}
