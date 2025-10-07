"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var express_1 = require("express");
exports.paymentRouter = (0, express_1.Router)();
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var validations_1 = require("../validations");
// Payment routes
exports.paymentRouter.post("/checkout", [middlewares_1.authenticate, (0, middlewares_1.validator)(validations_1.paymentSchema.paymentDTO)], controllers_1.paymentController.stripePaymentLink);
exports.paymentRouter.get("/checkout/details/:id", middlewares_1.authenticate, controllers_1.paymentController.retrievePaymentLink);
