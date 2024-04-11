import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DataService {
    readonly events = [
        { name: "Retreat #1", type: "retreat" },
        { name: "Retreat #2", type: "retreat" },
    ];
}
