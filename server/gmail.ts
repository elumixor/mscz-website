import { EventEmitter, all } from "@elumixor/frontils";
import { authenticate } from "@google-cloud/local-auth";
import fs from "fs";
import type { JWTInput, OAuth2Client } from "google-auth-library";
import { gmail_v1, google } from "googleapis";
import { fileData } from "./utils";
import nodemailer from "nodemailer";

export class Gmail {
    private readonly authenticated = new EventEmitter<gmail_v1.Gmail>();
    // If modifying these scopes, delete token.json.
    private readonly scopes = ["https://www.googleapis.com/auth/gmail.modify"];
    private readonly token = fileData<JWTInput>(".secret/google.token.json");
    private readonly credentialsPath = ".secret/google.credentials.json";

    readonly gmail = this.authenticated.nextEvent;

    async authorize() {
        const token = this.token();
        if (token) {
            const auth = google.auth.fromJSON(token) as OAuth2Client;
            const gmail = google.gmail({ version: "v1", auth });
            this.authenticated.emit(gmail);
            return;
        }

        const auth = await authenticate({
            scopes: this.scopes,
            keyfilePath: this.credentialsPath,
        });

        const content = fs.readFileSync(this.credentialsPath, "utf-8");
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;

        this.token.set({
            type: "authorized_user",
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: auth.credentials.refresh_token!,
        });

        const gmail = google.gmail({ version: "v1", auth });
        this.authenticated.emit(gmail);
    }

    async sendTestEmail() {
        const emailLines = [
            "From: meditationsteps.czechia@gmail.com",
            "To: meditationsteps.czechia@gmail.com",
            "Content-type: text/html;charset=iso-8859-1",
            "MIME-Version: 1.0",
            "Subject: Test Subject",
            "",
            "<h1>This is a test email</h1>",
        ];

        const email = emailLines.join("\r\n").trim();
        const base64Email = Buffer.from(email).toString("base64");

        const gmail = await this.gmail;
        await gmail.users.messages.send({
            userId: "me",

            requestBody: {
                raw: base64Email,
            },
        });
    }
}

const gmail = new Gmail();
await gmail.authorize();
// await gmail.listLabels();
await gmail.sendTestEmail();
