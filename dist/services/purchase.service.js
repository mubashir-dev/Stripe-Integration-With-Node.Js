"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseDetails = exports.purchaseList = exports.purchaseCourse = void 0;
var course_purchase_model_1 = require("../models/course-purchase.model");
var course_model_1 = require("../models/course.model");
var utils_1 = require("../utils");
var stripe_1 = require("../common/stripe");
var mongoose_1 = require("mongoose");
function purchaseCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, courseId, sessionId, _b, courseExists, coursePurchase, payment, coursePurchaseData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = res.locals.USER_DATA.id;
                    _a = req.body, courseId = _a.courseId, sessionId = _a.sessionId;
                    return [4 /*yield*/, Promise.all([
                            course_model_1.courseModel.findOne({ _id: courseId }),
                            course_purchase_model_1.coursePurchaseModel.findOne({ courseId: courseId, userId: id })
                        ])];
                case 1:
                    _b = _c.sent(), courseExists = _b[0], coursePurchase = _b[1];
                    return [4 /*yield*/, stripe_1.stripe.checkout.sessions.retrieve(sessionId)];
                case 2:
                    payment = _c.sent();
                    if (!payment)
                        return [2 /*return*/, (0, utils_1.apiResponse)({
                                response: res,
                                message: "Payment not found",
                                code: 400
                            })];
                    if (!courseExists)
                        return [2 /*return*/, (0, utils_1.apiResponse)({ response: res, message: "Course not found", code: 404 })];
                    if (coursePurchase)
                        return [2 /*return*/, (0, utils_1.apiResponse)({ response: res, message: "Course already purchased", code: 409 })];
                    coursePurchaseData = course_purchase_model_1.coursePurchaseModel.create({
                        courseId: courseId,
                        userId: id,
                        amount: payment.amount_total,
                        currency: payment.currency,
                        sessionId: payment.id,
                        status: payment.status,
                        paymentStatus: payment.payment_status
                    });
                    return [2 /*return*/, coursePurchaseData];
            }
        });
    });
}
exports.purchaseCourse = purchaseCourse;
function aggregatePurchase(findOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, findQuery, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = findOptions.userId;
                    findQuery = {
                        userId: new mongoose_1.Types.ObjectId(userId),
                    };
                    findQuery = (findOptions === null || findOptions === void 0 ? void 0 : findOptions.id) && __assign(__assign({}, findQuery), { _id: new mongoose_1.Types.ObjectId(findOptions.id) });
                    return [4 /*yield*/, course_purchase_model_1.coursePurchaseModel.aggregate([
                            {
                                $match: __assign({}, findQuery)
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "userId",
                                    foreignField: "_id",
                                    pipeline: [
                                        {
                                            $project: {
                                                "_id": 1,
                                                "name": 1,
                                                "email": 1,
                                            }
                                        },
                                    ],
                                    as: "createdBy",
                                },
                            },
                            {
                                $unwind: "$createdBy"
                            },
                            {
                                $lookup: {
                                    from: "courses",
                                    localField: "courseId",
                                    foreignField: "_id",
                                    pipeline: [
                                        {
                                            $project: {
                                                "_id": 1,
                                                "title": 1,
                                                "description": 1,
                                                "image": 1
                                            }
                                        },
                                    ],
                                    as: "course",
                                },
                            },
                            {
                                $unwind: "$course"
                            }
                        ])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function purchaseList(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = res.locals.USER_DATA.id;
                    return [4 /*yield*/, aggregatePurchase({ userId: id })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.purchaseList = purchaseList;
function purchaseDetails(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, aggregatePurchase({ userId: res.locals.USER_DATA.id, id: id })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.purchaseDetails = purchaseDetails;
