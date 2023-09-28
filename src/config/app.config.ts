import * as dotenv from "dotenv";

dotenv.config();

export const appConfig = {
    appName: process.env.APP_NAME,
    appNodeEnv: process.env.NODE_ENV,
    apiVersion: process.env.API_VERSION || "v1",
    nodeServicePort: process.env.NODE_SERVICE_PORT || 4000,
    encryptionSalt: process.env.NODE_SERVICE_ENCRYPTION_SALT
};
