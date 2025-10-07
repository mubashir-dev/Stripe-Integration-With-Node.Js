"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
var express_1 = require("express");
exports.courseRouter = (0, express_1.Router)();
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var validations_1 = require("../validations");
// Course routes
exports.courseRouter.get("/", middlewares_1.authenticate, controllers_1.courseController.findAll);
exports.courseRouter.get("/:id", middlewares_1.authenticate, controllers_1.courseController.findOne);
exports.courseRouter.post("/", [middlewares_1.authenticate, (0, middlewares_1.validator)(validations_1.courseValidationSchema.storeCourseDTO)], controllers_1.courseController.store);
