import { Component, ElementRef, Input, ViewChild, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ButtonComponent, FeatureComponent, HorizontalSectionComponent, TabComponent } from "@components";
import { Retreat2Component } from "../../../retreat-2.component";
import { gsap } from "gsap";
import { AppComponent } from "../../../../../../../app.component";

@Component({
    selector: "app-place",
    standalone: true,
    imports: [FeatureComponent, HorizontalSectionComponent, ButtonComponent, TabComponent],
    templateUrl: "./place.component.html",
    styleUrl: "./place.component.scss",
})
export class PlaceComponent {
    @Input({ required: true }) images!: string[];

    @ViewChild("map") map!: ElementRef<HTMLElement>;
    @ViewChild("horizontal", { read: ElementRef, static: true }) horizontal!: ElementRef<HTMLElement>;
    @ViewChild("feature") feature!: FeatureComponent;

    private readonly sanitizer = inject(DomSanitizer);
    readonly place = inject(Retreat2Component).place;
    private readonly googleMapsApiKey = inject(AppComponent).googleMapsApiKey;

    readonly googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed/v1/place?key=${this.googleMapsApiKey}&q=${this.place.title}@${this.place.lat},${this.place.long}&zoom=${this.place.zoom}`,
    );

    showingMap = false;

    showMap() {
        this.showingMap = true;
        gsap.to(window, { duration: 0.5, scrollTo: { y: this.map.nativeElement } });
    }
}
