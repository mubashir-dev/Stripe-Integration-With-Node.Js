"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
var apiResponse = function (data) {
    var _a = data, response = _a.response, message = _a.message, _b = _a.result, result = _b === void 0 ? null : _b, _c = _a.code, code = _c === void 0 ? 200 : _c, _d = _a.errors, errors = _d === void 0 ? null : _d, _e = _a.isSuccess, isSuccess = _e === void 0 ? true : _e;
    return response.status(code).json({
        code: code,
        errors: errors,
        message: message,
        result: result,
        isSuccess: isSuccess,
    });
};
exports.apiResponse = apiResponse;
