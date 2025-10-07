"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./index");
var mainRouter = (0, express_1.Router)();
var versionRouter = (0, express_1.Router)();
mainRouter.use("/api/v1", versionRouter);
//versionRouter
versionRouter.use('/auth', index_1.authRouter);
versionRouter.use('/course', index_1.courseRouter);
versionRouter.use('/purchase', index_1.purchaseRouter);
versionRouter.use('/stripe', index_1.paymentRouter);
mainRouter.use('/app', index_1.appRouter);
exports.default = mainRouter;
