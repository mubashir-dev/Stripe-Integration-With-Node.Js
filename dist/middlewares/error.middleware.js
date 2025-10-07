"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var utils_1 = require("../utils");
var errorHandler = function (err, request, response) {
    var originalError = err;
    utils_1.logger.error("URL: ".concat(request.url), {
        meta: { error: originalError.stack, body: request },
    });
    return (0, utils_1.apiResponse)({
        response: response,
        code: 500,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
