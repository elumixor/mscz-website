import type { Review } from "@domain";
import { Gmail } from "./gmail";
import { request } from "./server";
import fs from "fs";

export class Api {
    private readonly gmail = new Gmail();

    private readonly paymentHTMLs = new Map(
        ["en", "ru"].map((lang) => [lang, fs.readFileSync(`./emails/payment/email.${lang}.html`, "utf-8")]),
    );

    private readonly subjects = new Map(
        [...this.paymentHTMLs].map(([lang, html]) => [lang, html.match(/<title>(.*?)<\/title>/)?.[1]]),
    );

    private readonly reviewsMap = {
        "retreat-1": this.readReviews("retreat-1"),
        dada: this.readReviews("dada"),
        didi: this.readReviews("didi"),
    };

    @request("register")
    async register({ email, language }: { email: string; language: string }) {
        // eslint-disable-next-line no-console
        console.log("Registering user with email", email);

        const html = this.paymentHTMLs.get(language)!;
        const subject = this.subjects.get(language)!;

        await this.gmail.send({
            to: email,
            subject,
            html,
        });
    }

    @request("reviews/:kind")
    reviews({ kind }: { kind: keyof Api["reviewsMap"] }) {
        return this.reviewsMap[kind];
    }

    private readReviews(kind: string) {
        // Get all TXT files from the reviews folder
        const folder = fs.readdirSync(`./reviews/${kind}`);
        const reviews = folder.map((file) => this.getReview(`./reviews/${kind}/${file}`));

        // Sort reviews: non-anonymous first, then by name
        reviews.sort((a, b) => {
            if (a.anonymous) {
                if (b.anonymous) return 0;
                return 1;
            }

            if (b.anonymous) return -1;

            return a.name.localeCompare(b.name);
        });

        return reviews;
    }

    private getReview(filePath: string): Review {
        const content = fs.readFileSync(filePath, "utf-8");

        // Read the first line
        const [title, ...rest] = content.split("\n");

        if (title === "?")
            return {
                anonymous: true,
                content: rest.join("\n"),
            };

        const id = title;
        const name = rest[0];

        return {
            anonymous: false,
            id,
            name,
            content: rest.slice(1).join("\n"),
        };
    }
}
