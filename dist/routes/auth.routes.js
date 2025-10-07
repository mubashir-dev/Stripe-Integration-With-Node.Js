"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
exports.authRouter = (0, express_1.Router)();
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var validations_1 = require("../validations");
// Auth routes
exports.authRouter.post("/sign-up", (0, middlewares_1.validator)(validations_1.authValidationSchema.signUpDTO), controllers_1.authController.signUp);
exports.authRouter.post("/sign-in", (0, middlewares_1.validator)(validations_1.authValidationSchema.signInDTO), controllers_1.authController.signIn);
exports.authRouter.get("/current-user", middlewares_1.authenticate, controllers_1.authController.currentUser);
