import { HttpClient } from "@angular/common/http";
import { Injectable, inject, isDevMode } from "@angular/core";
import { cyan, magenta } from "@elumixor/frontils";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class NetworkService {
    private readonly http = inject(HttpClient);
    private readonly url = isDevMode() ? `http://${import.meta.env.NG_APP_URL}:4000` : "";

    private readonly language = $localize.locale ?? "en";

    // Helpers
    async post<T = unknown>(path: string, params?: Record<string, unknown>) {
        params = { ...params, language: this.language };
        // eslint-disable-next-line no-console
        if (isDevMode()) console.log(cyan(`API request: ${path}`), params);

        const result = (await lastValueFrom(this.http.post(`${this.url}/api/${path}`, params))) as Promise<T>;

        // eslint-disable-next-line no-console
        if (isDevMode()) console.log(magenta(`API Response: ${path}`), result);

        return result;
    }
}
