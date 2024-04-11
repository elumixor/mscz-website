import { Component, inject } from "@angular/core";
import { DataService } from "@services";

@Component({
    selector: "app-footer",
    standalone: true,
    imports: [],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
})
export class FooterComponent {
    private readonly data = inject(DataService);
    get retreats() {
        return this.data.events.filter((event) => event.type === "retreat");
    }
}
