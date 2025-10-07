"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
var stripe_1 = __importDefault(require("stripe"));
var config_1 = require("../config");
exports.stripe = new stripe_1.default(config_1.stripeConfig.key, {
    apiVersion: '2023-08-16'
});
