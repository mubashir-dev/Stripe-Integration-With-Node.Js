"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = require("./config");
var utils_1 = require("./utils");
var middlewares_1 = require("./middlewares");
var api_routes_1 = __importDefault(require("./routes/api.routes"));
var swagger_1 = require("./swagger");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var app = (0, express_1.default)();
app.use(express_1.default.json(), express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) { return (0, middlewares_1.requestLogger)(req, res, next); });
app.use((0, cors_1.default)());
app.set("trust proxy", true);
app.use(api_routes_1.default);
//swagger
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
//404 
app.use('*', function (req, res, next) {
    res.status(404);
    res.json({
        message: "404 Not Found"
    });
});
//error handler
app.use(function (error, req, res, next) { return (0, middlewares_1.errorHandler)(error, req, res); });
//establish database connection
// connectDatabase();
app.listen(config_1.appConfig.nodeServicePort, function () {
    utils_1.logger.info("\uD83D\uDE80 Started server on => http://localhost:".concat(config_1.appConfig.nodeServicePort));
});
