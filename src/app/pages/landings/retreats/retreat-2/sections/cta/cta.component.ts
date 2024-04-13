import { isPlatformBrowser } from "@angular/common";
import { Component, ElementRef, PLATFORM_ID, ViewChild, inject, type AfterViewInit } from "@angular/core";

@Component({
    selector: "app-cta",
    standalone: true,
    imports: [],
    templateUrl: "./cta.component.html",
    styleUrl: "./cta.component.scss",
})
export class CtaComponent implements AfterViewInit {
    @ViewChild("cta") cta!: ElementRef<HTMLDivElement>;

    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    ngAfterViewInit() {
        if (!this.isBrowser) return;


    }
}
