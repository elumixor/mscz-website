import { HttpClient } from "@angular/common/http";
import { Injectable, inject, isDevMode } from "@angular/core";
import { cyan, magenta } from "@elumixor/frontils";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class NetworkService {
    private readonly http = inject(HttpClient);
    private readonly url = isDevMode() ? "http://172.20.158.224:4000" : "";
    // private readonly url = "http://172.20.158.224:4000";
    // private readonly url = "";

    // Helpers
    async post<T = unknown>(path: string, params?: Record<string, unknown>) {
        // eslint-disable-next-line no-console
        console.log(cyan(`API request: ${path}`), params);

        const result = (await lastValueFrom(this.http.post(`${this.url}/api/${path}`, params))) as Promise<T>;

        // eslint-disable-next-line no-console
        console.log(magenta(`API Response: ${path}`), result);

        return result;
    }
}
