"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @ts-ignore
const ObjectId = mongoose_1.Schema.ObjectId;
const orderSchema = new mongoose_1.Schema({
    userId: { type: ObjectId, required: true },
    productId: { type: ObjectId, required: true },
    productName: { type: String },
    productPrice: { type: Number },
    amount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    payStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    payAt: { type: Date },
});
exports.default = mongoose_1.model("Ticket", orderSchema);
