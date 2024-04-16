import { Gmail } from "./gmail";
import { post } from "./server";
import fs from "fs";

export class Api {
    private readonly gmail = new Gmail();
    private readonly paymentHTML = fs.readFileSync("./emails/payment/email.html", "utf-8");

    @post("register")
    async register({ email }: { email: string }) {
        console.log("Registering user with email", email);
        console.log("Sending an email to the user to confirm their email address");
        // await this.gmail.send({
        //     to: email,
        //     subject: "May Retreat - Payment information | MeditationSteps.cz",
        //     html: this.paymentHTML,
        // });
    }
}
