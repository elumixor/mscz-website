import type { Review } from "@domain";
import { Gmail } from "./gmail";
import { post } from "./server";
import fs from "fs";

export class Api {
    private readonly gmail = new Gmail();
    // private readonly paymentHTML = fs.readFileSync("./emails/payment/email.html", "utf-8");
    private readonly paymentHTML = fs.readFileSync("./emails/payment/email.ru.html", "utf-8");

    private readonly reviewsMap = {
        "retreat-1": this.readReviews("retreat-1"),
        dada: this.readReviews("dada"),
        didi: this.readReviews("didi"),
    };

    @post("register")
    async register({ email }: { email: string }) {
        // eslint-disable-next-line no-console
        console.log("Registering user with email", email);
        await this.gmail.send({
            to: email,
            // subject: "May Retreat - Payment information | MeditationSteps.cz",
            subject: "Майский ретрит - Информация об оплате | MeditationSteps.cz",
            html: this.paymentHTML,
        });
    }

    @post("reviews/:kind")
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
