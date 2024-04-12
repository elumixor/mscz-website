import { isPlatformBrowser } from "@angular/common";
import { Component, PLATFORM_ID, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@components";

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

        console.log(window.innerHeight);
        document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);

        document.addEventListener("resize", () => {
            console.log(window.innerHeight);
            document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
        });
        // document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    }
}
