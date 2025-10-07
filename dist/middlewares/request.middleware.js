"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
var utils_1 = require("../utils");
var os_1 = __importDefault(require("os"));
var requestLogger = function (request, response, next) {
    response.on('finish', function () {
        var ip = request.ip, method = request.method, url = request.url;
        var statusCode = response.statusCode;
        var hostname = os_1.default.hostname();
        var userAgent = request.get('user-agent') || '';
        utils_1.logger.info("[hostname: ".concat(hostname, "] [method : ").concat(method, "] [url: ").concat(url, "] [status : ").concat(statusCode, "] [userAgent:[").concat(userAgent, "] Ip:[").concat(ip, "]]"));
    });
    next();
};
exports.requestLogger = requestLogger;
