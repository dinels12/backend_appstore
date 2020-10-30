"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// @ts-ignore
//  @denial-code
const ObjectId = mongoose_1.Schema.ObjectId;
const adPlans = {
    values: ["Free", "Basic", "Pro"],
    message: "{VALUE} no es un plan valido",
};
const adSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    imageURL: {
        String,
        required: [true, "La imagen del anuncio es necesaria"],
    },
    public_id: String,
    companyId: { type: ObjectId, required: true },
    price: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    plan: {
        type: String,
        default: "Free",
        required: [true],
        enum: adPlans,
    },
    publishAds: { type: Number, default: 1000 },
}, { versionKey: false, timestamps: true });
adSchema.plugin(mongoose_unique_validator_1.default, {
    message: "El {PATH} debe de ser unico",
});
exports.default = mongoose_1.model("Ad", adSchema);
