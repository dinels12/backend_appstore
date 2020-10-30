"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// @ts-ignore
// @denial-code
const ObjectId = mongoose_1.Schema.ObjectId;
const companyPlans = {
    values: ["Starter", "Basic", "Pro", "Premium"],
    message: "{VALUE} no es un plan valido",
};
const companySchema = new mongoose_1.Schema({
    nick: { type: String, unique: true, required: true },
    name: {
        type: String,
        required: [true, "El nombre de la empresa es necesario"],
        unique: true,
    },
    location: { type: String, required: [true, "La ubicacion es necesaria"] },
    description: { type: String },
    ownerId: { type: ObjectId, required: true, unique: true },
    active: { type: Boolean, default: false },
    schedule: { type: String },
    plan: {
        type: String,
        default: "Starter",
        required: [true],
        enum: companyPlans,
    },
    maxProductActive: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now },
    planPayDate: { type: Date },
    expiredPlanDate: { type: Date },
}, { versionKey: false, timestamps: true });
companySchema.plugin(mongoose_unique_validator_1.default, {
    message: "El {PATH} debe de ser unico",
});
exports.default = mongoose_1.model("Company", companySchema);
