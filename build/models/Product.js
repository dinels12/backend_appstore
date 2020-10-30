"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// @ts-ignore
const ObjectId = mongoose_1.Schema.ObjectId;
const publishPlan = {
    values: ["Free", "Basic", "Pro"],
    message: "{VALUE} no es un plan valido",
};
const productSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: { type: String },
    companyId: { type: ObjectId, required: true },
    stock: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    plan: {
        type: String,
        default: "Free",
        required: [true],
        enum: publishPlan,
    },
    publishAds: { type: Number, default: 1000 },
});
productSchema.plugin(mongoose_unique_validator_1.default, {
    message: "El {PATH} debe de ser unico",
});
exports.default = mongoose_1.model("Product", productSchema);
