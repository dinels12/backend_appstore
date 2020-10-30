"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV === "development" ? require("dotenv").config() : null;
exports.default = {
    API_KEY: process.env.API_KEY || null,
    API_SECRET: process.env.API_SECRET || null,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || null,
    DB: process.env.DB || null,
    SEED_AUTENTICACION: process.env.SEED_AUTENTICACION || null,
    PORT: process.env.PORT || 4000,
};
