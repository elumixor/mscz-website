// Define the type of the environment variables.
declare interface Env {
    readonly NG_APP_URL: string;
}

declare interface ImportMeta {
    readonly env: Env;
}
