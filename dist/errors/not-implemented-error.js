"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = __importDefault(require("./http-error"));
class NotImplementedError extends http_error_1.default {
    constructor(message = 'Not Implemented') {
        super(501, message);
        this.name = 'NotImplementedError';
    }
}
;
exports.default = NotImplementedError;
