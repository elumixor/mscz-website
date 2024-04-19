import { Component, ElementRef, Input, ViewChild, inject } from "@angular/core";
import { IconComponent } from "@components/icon.component";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: "app-video",
    standalone: true,
    imports: [IconComponent],
    templateUrl: "./video.component.html",
    styleUrl: "./video.component.scss",
})
export class VideoComponent {
    @Input({ required: true }) src?: string;

    readonly element = inject(ElementRef).nativeElement as HTMLElement;

    @ViewChild("video", { read: ElementRef, static: true }) video!: ElementRef<HTMLVideoElement>;

    private gsapRegistered = false;

    get videoPlaying() {
        return !this.video.nativeElement.paused;
    }

    play() {
        gsap.to(window, { duration: 1, scrollTo: { y: this.element, offsetY: 10 } });
        void this.video.nativeElement.play();

        if (!this.gsapRegistered) {
            this.gsapRegistered = true;
            ScrollTrigger.create({
                trigger: this.element,
                start: "50% 80%",
                end: "50% 20%",
                onLeave: () => this.video.nativeElement.pause(),
                onLeaveBack: () => this.video.nativeElement.pause(),
            });
        }
    }

    toggleVideo() {
        if (this.videoPlaying) this.video.nativeElement.pause();
        else this.play();
    }

    onEnded() {
        this.video.nativeElement.currentTime = 0;
        this.video.nativeElement.pause();
    }
}
