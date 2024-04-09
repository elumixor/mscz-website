import { Component, inject } from "@angular/core";
import { CenteredComponent } from "@components/centered/centered.component";
import { TimeService } from "@services";

@Component({
    selector: "app-timer",
    standalone: true,
    imports: [CenteredComponent],
    templateUrl: "./timer.component.html",
    styleUrl: "./timer.component.scss",
})
export class TimerComponent {
    readonly timeService = inject(TimeService);

    phase = "meditation";

    next() {
        console.log("!");
    }
}
