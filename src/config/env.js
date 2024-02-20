const dotenv = require("dotenv");
dotenv.config();

exports.PORT = process.env.PORT || 3000;
exports.DB_NAME = process.env.DB_NAME || "ceec";
exports.DB_USER = process.env.DB_USER || "ayoria";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "123456";
exports.DB_HOST = process.env.DB_HOST || "";
exports.DB_PORT = process.env.DB_PORT || "";
exports.DB_DIALECT = process.env.DB_DIALECT || "postgres";
exports.JWT_SECRET = process.env.JWT_SECRET || "";
exports.CLOUD_NAME = process.env.CLOUD_NAME || "";
exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY || "";
exports.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || "";
