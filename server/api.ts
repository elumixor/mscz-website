import { post } from "./server";

export class Api {
    @post("register")
    async register({ email, password }: { email: string; password: string }) {
        console.log("Registering user with email", email, "and password", password);
    }
}
