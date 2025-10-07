"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var express_1 = require("express");
exports.appRouter = (0, express_1.Router)();
var controllers_1 = require("../controllers");
//to ping the server
exports.appRouter.get("/status", controllers_1.appController.systemCheck);
