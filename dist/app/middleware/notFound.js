"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "API not found !!",
        error: "",
    });
};
exports.default = notFound;
