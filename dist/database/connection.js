"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
var mongoose_1 = require("mongoose");
var config_1 = require("../config");
var utils_1 = require("../utils");
var connectDatabase = function () {
    var DATABASE_URL = "".concat(config_1.databaseConfig.dialect, "://").concat(config_1.databaseConfig.host, ":").concat(config_1.databaseConfig.port, "/").concat(config_1.databaseConfig.name);
    (0, mongoose_1.connect)(DATABASE_URL, function (err) {
        if (!err) {
            utils_1.logger.info("\uD83D\uDCBF Connection has been established with database :  ".concat(config_1.databaseConfig.name));
        }
        else {
            utils_1.logger.error("Connection has not been established with database ".concat(err.stack));
        }
    });
};
exports.connectDatabase = connectDatabase;
