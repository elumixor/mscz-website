import { Component } from "@angular/core";
import { AvatarComponent, IconComponent } from "@components";

@Component({
    selector: "app-contacts",
    standalone: true,
    imports: [AvatarComponent, IconComponent],
    templateUrl: "./contacts.component.html",
    styleUrl: "./contacts.component.scss",
})
export class ContactsComponent {
    readonly contact = {
        name: "Sergey",
        phone: "+420 774 947 327",
    };
}
