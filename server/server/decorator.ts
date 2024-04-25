import type { RequestMetadata } from "./request-metadata";
import { requestSymbol } from "./request-symbol";

export function request(path: string) {
    return function (target: object, propertyKey: PropertyKey) {
        const existing = (Reflect.getMetadata(requestSymbol, target) ?? []) as RequestMetadata[];
        existing.push({ path, propertyKey, method: "post" });
        Reflect.defineMetadata(requestSymbol, existing, target);
    };
}
