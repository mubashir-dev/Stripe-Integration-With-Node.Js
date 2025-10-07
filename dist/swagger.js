"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express TypeScript API',
            version: '1.0.0',
            description: 'Auto-generated Swagger docs for Express + TypeScript app',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/main.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
