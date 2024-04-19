import { EventEmitter } from "@elumixor/frontils";
import type { JWTInput, OAuth2Client } from "google-auth-library";
import { gmail_v1, google } from "googleapis";
import juice from "juice";
import MailComposer from "nodemailer/lib/mail-composer";
import type Mail from "nodemailer/lib/mailer";
import path from "path";
import { fileData } from "./utils";

export class Gmail {
    private readonly authenticated = new EventEmitter<gmail_v1.Gmail>();
    // If modifying these scopes, delete token.json.
    private readonly token = fileData<JWTInput>("secret/google.token.json");

    readonly gmail = this.authenticated.nextEvent;

    constructor() {
        this.authorize();
    }

    async send(options: {
        to: string;
        subject: string;
        html: string;
        text?: string;
        attachments?: Mail.Attachment[];
        replacements?: Record<string, string>;
    }) {
        const { html, attachments } = this.processHTML(options.html, options.replacements);
        options.html = html;
        options.attachments = [...(options.attachments ?? []), ...attachments];

        const mail = new MailComposer(options);
        const message = await mail.compile().build();
        const encodedMessage = Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        const gmail = await this.gmail;

        // eslint-disable-next-line no-console
        console.log("Sending email to", options.to);
        await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage,
            },
        });
    }

    private authorize() {
        const token = this.token();
        if (!token) throw new Error("No token found. Call 'npm run gmail' to authenticate.");

        const auth = google.auth.fromJSON(token) as OAuth2Client;
        const gmail = google.gmail({ version: "v1", auth });
        this.authenticated.emit(gmail);
    }

    private processHTML(html: string, replacements?: Record<string, string>) {
        for (const [key, value] of Object.entries(replacements ?? {}))
            html = html.replace(new RegExp(`{{${key}}}`, "g"), value);

        const attachments: Mail.Attachment[] = [];

        // Extract src="[EXTRACTED]" and replace it with src="cid:attachment[number]"
        let i = 0;

        const regex = /src="([^"]+)"/g;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(html)) !== null) {
            const [src, extracted] = match;
            const attachment = {
                filename: path.basename(extracted),
                path: `.${extracted}`,
                cid: `attachment${i}`,
            };
            html = html.replace(src, `src="cid:${attachment.cid}"`);
            attachments.push(attachment);
            i++;
        }

        // Inline CSS
        html = juice(html);

        return { html, attachments };
    }
}
