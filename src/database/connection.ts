import { connect } from "mongoose";
import { databaseConfig } from "../config";
import { logger } from "../utils";


export const connectDatabase = () => {
    const DATABASE_URL: string = `${databaseConfig.dialect}://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}`;
    connect(DATABASE_URL, (err) => {
        if (!err) {
            logger.info(`💿 Connection has been established with database :  ${databaseConfig.name}`)
        } else {
            logger.error(`Connection has not been established with database ${err.stack}`)
        }
    });

}
