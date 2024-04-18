import { isPlatformBrowser } from "@angular/common";
import { Component, PLATFORM_ID, inject, signal, type OnInit } from "@angular/core";
import { HorizontalSectionComponent, ReviewComponent } from "@components";
import type { Review } from "@domain";
import { NetworkService } from "@services";

@Component({
    selector: "app-reviews",
    standalone: true,
    imports: [ReviewComponent, HorizontalSectionComponent],
    templateUrl: "./reviews.component.html",
    styleUrl: "./reviews.component.scss",
})
export class ReviewsComponent implements OnInit {
    readonly reviews = signal([] as Review[]);

    private readonly network = inject(NetworkService);
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    ngOnInit() {
        if (!this.isBrowser) return;
        void this.network.post("reviews/retreat-1").then((reviews) => this.reviews.set(reviews as Review[]));
    }
}
