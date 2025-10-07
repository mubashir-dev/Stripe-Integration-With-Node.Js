"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRouter = void 0;
var express_1 = require("express");
exports.purchaseRouter = (0, express_1.Router)();
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var validations_1 = require("../validations");
// Purchase Course routes
exports.purchaseRouter.get("/list", middlewares_1.authenticate, controllers_1.purchaseController.purchaseList);
exports.purchaseRouter.get("/list/:id", middlewares_1.authenticate, controllers_1.purchaseController.purchaseDetails);
exports.purchaseRouter.post("/", [middlewares_1.authenticate, (0, middlewares_1.validator)(validations_1.coursePurchase.purchaseDTO)], controllers_1.purchaseController.purchaseCourse);
