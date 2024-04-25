import { authenticate } from "@google-cloud/local-auth";
import fs from "fs";
import type { JWTInput } from "google-auth-library";
import { fileData } from "../utils";
import { green } from "@elumixor/frontils";

const credentialsPath = "secret/google.credentials.json";
const scopes = ["https://www.googleapis.com/auth/gmail.modify"];

const auth = await authenticate({
    scopes,
    keyfilePath: credentialsPath,
});

const content = fs.readFileSync(credentialsPath, "utf-8");
const keys = JSON.parse(content) as { installed?: JWTInput; web?: JWTInput };
const key = keys.installed ?? keys.web;

const token = fileData<JWTInput>("secret/google.token.json");
token.set({
    type: "authorized_user",
    client_id: key?.client_id,
    client_secret: key?.client_secret,
    refresh_token: auth.credentials.refresh_token!,
});

// eslint-disable-next-line no-console
console.log(green("Authenticated successfully!"));
