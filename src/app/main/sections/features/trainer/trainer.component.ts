import { Component, Input, ViewChild } from "@angular/core";
import {
    ButtonComponent,
    FeatureComponent,
    IconComponent,
    ImageComponent,
    TabComponent,
    VideoComponent,
} from "@components";
import { CardComponent } from "@components/card/card.component";

@Component({
    selector: "app-trainer",
    standalone: true,
    imports: [
        ImageComponent,
        CardComponent,
        FeatureComponent,
        IconComponent,
        TabComponent,
        VideoComponent,
        ButtonComponent,
    ],
    templateUrl: "./trainer.component.html",
    styleUrl: "./trainer.component.scss",
})
export class TrainerComponent {
    @Input({ required: true }) image!: string;
    @Input() video?: string;
    @Input() invitationLanguage?: string;

    @Input() marginTop = true;
    @Input() marginBottom = true;
    @ViewChild("videoRef") videoComponent!: VideoComponent;

    showingVideo = false;

    showVideo() {
        this.showingVideo = true;
        this.videoComponent.play();
    }
}
