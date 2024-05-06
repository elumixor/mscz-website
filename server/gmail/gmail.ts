import juice from "juice";
import MailComposer from "nodemailer/lib/mail-composer";
import type Mail from "nodemailer/lib/mailer";
import path from "path";
import { fileData } from "../utils";
import nodemailer from "nodemailer";

export class Gmail {
    // If modifying these scopes, delete token.json.
    private readonly password = fileData<string>("secret/google.json", { required: true });
    private readonly transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "meditationsteps.czechia@gmail.com",
            pass: this.password(),
        },
    });

    async send(options: {
        to: string;
        subject: string;
        html: string;
        attachments?: Mail.Attachment[];
        replacements?: Record<string, string>;
    }) {
        const { html, attachments } = this.processHTML(options.html, options.replacements);
        options.html = html;
        options.attachments = [...(options.attachments ?? []), ...attachments];

        // eslint-disable-next-line no-console
        console.log("Sending email to", options.to);

        return new Promise((res, rej) => {
            this.transporter.sendMail(
                {
                    from: "me",
                    to: options.to,
                    subject: options.subject,
                    html: options.html,
                    attachments: options.attachments,
                },
                (error, info) => {
                    if (error) rej(error);
                    else res(info.response);
                },
            );
        });
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
                cid: `attachment${String(i)}`,
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
