import * as dotenv from "dotenv";

dotenv.config();

export const stripeConfig = {
    key: process.env.STRIPE_KEY
};
