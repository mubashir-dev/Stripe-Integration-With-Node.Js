import * as dotenv from "dotenv";

dotenv.config();

export const jwtConfig = {
    secret: process.env.JWT_AUTH,
    timeout: process.env.JWT_TIMEOUT,
};
