import { Component, ElementRef, Input, ViewChild, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
    ButtonComponent,
    FeatureComponent,
    HorizontalSectionComponent,
    ImageComponent,
    TabComponent,
} from "@components";
import { CardComponent } from "@components/card/card.component";
import { AppComponent } from "../../../../app.component";
import { MainComponent } from "../../../main.component";

@Component({
    selector: "app-place",
    standalone: true,
    imports: [
        FeatureComponent,
        ImageComponent,
        HorizontalSectionComponent,
        ButtonComponent,
        TabComponent,
        CardComponent,
    ],
    templateUrl: "./place.component.html",
    styleUrl: "./place.component.scss",
})
export class PlaceComponent {
    @Input() marginTop = true;
    @Input() marginBottom = true;
    @ViewChild("map") map!: ElementRef<HTMLElement>;
    @ViewChild("directions", { read: ElementRef }) directions!: ElementRef<HTMLElement>;

    readonly hide = $localize`Hide`;
    readonly show = $localize`Show`;

    private readonly sanitizer = inject(DomSanitizer);
    readonly place = inject(MainComponent).place;
    private readonly googleMapsApiKey = inject(AppComponent).googleMapsApiKey;

    readonly googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed/v1/place?key=${this.googleMapsApiKey}&q=${this.place.title}@${this.place.lat},${this.place.long}&zoom=${this.place.zoom}`,
    );

    showingMap = false;
    showingDirections = false;

    toggleMap() {
        this.showingMap = !this.showingMap;
    }

    toggleDirections() {
        this.showingDirections = !this.showingDirections;
    }
}
