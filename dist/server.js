"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const datasource_1 = require("./config/datasource");
const logger_1 = __importDefault(require("./utils/logger"));
const port = parseInt(process.env.PORT || '3000', 10);
datasource_1.datasource.initialize()
    .then(() => {
    app_1.default.listen(port, () => {
        logger_1.default.info(`Server is running on port ${port}`);
    });
})
    .catch((err) => logger_1.default.error(err));
