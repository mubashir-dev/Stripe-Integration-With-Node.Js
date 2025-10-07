"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursePurchaseModel = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("./user.model");
var course_model_1 = require("./course.model");
var coursePurchaseSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: course_model_1.courseModel, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.userModel, required: true },
    amount: { type: Number, required: true },
    currency: {
        type: String, required: true, enum: ['usd', 'pkr']
    },
    sessionId: { type: String, required: true, unique: true },
    paymentStatus: {
        type: String, required: true, enum: ['paid', 'not_paid']
    },
    status: {
        type: String, required: true, enum: ['incomplete', 'complete']
    }
}, { timestamps: true });
exports.coursePurchaseModel = (0, mongoose_1.model)('CoursePurchase', coursePurchaseSchema);
