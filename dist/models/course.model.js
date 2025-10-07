"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModel = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("./user.model");
var courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: user_model_1.userModel },
    tags: [{ type: String, required: false }],
    image: { type: String, required: true },
    meta: {
        currency: {
            type: String,
            required: true,
            enum: ['USD', 'PKR']
        },
        price: { type: Number, required: true },
    }
}, { timestamps: true });
exports.courseModel = (0, mongoose_1.model)('Course', courseSchema);
