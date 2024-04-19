import { Component, Input, ViewChild } from "@angular/core";
import { ButtonComponent, FeatureComponent, IconComponent, TabComponent, VideoComponent } from "@components";

@Component({
    selector: "app-trainer",
    standalone: true,
    imports: [FeatureComponent, IconComponent, TabComponent, VideoComponent, ButtonComponent],
    templateUrl: "./trainer.component.html",
    styleUrl: "./trainer.component.scss",
})
export class TrainerComponent {
    @Input({ required: true }) image!: string;
    @Input() video?: string;
    @Input() invitationLanguage?: string;
    @Input() side: "left" | "right" = "right";

    @ViewChild("videoRef") videoComponent!: VideoComponent;

    showingVideo = false;

    showVideo() {
        this.showingVideo = true;
        this.videoComponent.play();
    }
}
