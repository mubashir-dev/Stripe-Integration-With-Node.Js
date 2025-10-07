import mongoose, { connect } from "mongoose";
import { databaseConfig } from "../config";
import { logger } from "../utils";

mongoose.set('strictQuery', false);

export const connectDatabase = async () => {
    const DATABASE_URL: string = `${databaseConfig.dialect}://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}?authSource=admin`;
    try {
        await connect(DATABASE_URL);
        logger.info(`💿 Connection has been established with database :  ${databaseConfig.name}`);
    } catch (err: any) {
        logger.error(`Connection has not been established with database: ${err.stack}`);
    }
}