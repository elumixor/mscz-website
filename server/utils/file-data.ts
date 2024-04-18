import fs from "fs";

export interface Result<T> {
    (): T;
    save(): void;
    set(data: NonNullable<T>): void;
}

export function fileData<T>(file: string, options: { default: T }): Result<T>;
export function fileData<T>(file: string, options: { required: true }): Result<T>;
export function fileData<T>(file: string): Result<T | undefined>;
export function fileData<T>(file: string, options?: { default?: T; required?: boolean }) {
    let value: T | undefined;

    if (!fs.existsSync(file)) {
        if (options?.required) throw new Error(`File ${file} is required`);
        if (options?.default !== undefined) {
            value = options.default;
            fs.writeFileSync(file, JSON.stringify(value, null, 4));
        }
    } else {
        const content = fs.readFileSync(file, "utf-8");
        value = JSON.parse(content) as T;
    }

    const getData = () => {
        return value;
    };

    const setData = (data: T) => {
        value = data;
        fs.writeFileSync(file, JSON.stringify(data, null, 4));
    };

    const save = () => {
        if (value) setData(value);
    };

    Reflect.defineProperty(getData, "set", { value: setData });
    Reflect.defineProperty(getData, "save", { value: save });

    return getData as typeof getData & { set: typeof setData; save: typeof save };
}
