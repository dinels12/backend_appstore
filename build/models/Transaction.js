"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @ts-ignore
const ObjectId = mongoose_1.Schema.ObjectId;
const transactionSchema = new mongoose_1.Schema({
    createdId: { type: ObjectId, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.model("Transaction", transactionSchema);
