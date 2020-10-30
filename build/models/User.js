"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const rolesValidos = {
    values: ["ADMIN", "USER", "COMPANY", "GUEST", "TEST"],
    message: "{VALUE} no es un rol valido",
};
const userSchema = new mongoose_1.Schema({
    nick: { type: String, unique: true },
    name: { type: String, required: [true, "El nombre es necesario"] },
    lastname: { type: String, required: [true, "El apellido es necesario"] },
    dateBirth: {
        type: Date,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: { type: String, required: [true, "La clave es obligatoria"] },
    createdAt: { type: Date, default: Date.now },
    role: {
        type: String,
        default: "USER",
        required: [true],
        enum: rolesValidos,
    },
    maxCompany: { type: Number, default: 0 },
    lastLogin: { type: Date },
    balance: { type: Number, default: 0 },
    banned: { type: Boolean, default: false },
});
userSchema.methods.ToJSON = function () {
    let user = this;
    let userObject = user.toObject;
    delete userObject.password;
    return userObject;
};
userSchema.plugin(mongoose_unique_validator_1.default, {
    message: "El {PATH} debe de ser unico",
});
exports.default = mongoose_1.model("User", userSchema);
