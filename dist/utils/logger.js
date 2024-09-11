"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    levels: winston_1.default.config.syslog.levels,
    level: process.env.LOG_LEVEL || 'info',
    format: winston_1.default.format.cli(),
    transports: [new winston_1.default.transports.Console()]
});
exports.default = logger;
