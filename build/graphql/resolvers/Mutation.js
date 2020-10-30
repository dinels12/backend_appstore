"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const Product_1 = __importDefault(require("../../models/Product"));
const Company_1 = __importDefault(require("../../models/Company"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const randomNick = (name, lastname) => name.toLowerCase() +
    lastname.toLowerCase() +
    "#" +
    Math.round(Math.random() * 9999);
const Mutation = {
    userLogin: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            return { message: "Correo electronico incorrecto" };
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return {
                message: "Contraseña incorrecta",
            };
        }
        if (user.banned) {
            return { message: "Ban", token: null };
        }
        user = {
            _id: user._id,
        };
        const token = jsonwebtoken_1.default.sign({
            user,
        }, 
        // @ts-ignore
        config_1.default.SEED_AUTENTICACION, {
            expiresIn: "7d",
        });
        yield User_1.default.updateOne({ _id: user._id }, {
            $set: {
                lastLogin: Date.now(),
            },
        });
        return { message: "Inicio de sesion exitoso", token };
    }),
    createUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const { nick, role, name, lastname, email, password } = input;
        const newUser = new User_1.default({
            role,
            nick: nick || randomNick(name, lastname),
            name,
            lastname,
            email,
            password: bcrypt_1.default.hashSync(password, 10),
        });
        return yield newUser.save();
    }),
    updateUser: (_, { _id, input }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield User_1.default.findByIdAndUpdate(_id, input, {
            new: true,
        });
    }),
    deleteUser: (_, _id) => __awaiter(void 0, void 0, void 0, function* () {
        const { n } = yield User_1.default.deleteOne(_id);
        return n === 1
            ? { message: "Usuario eliminado" }
            : { message: "Usuario no encontrado" };
    }),
    createCompany: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.updateOne({ _id: input.ownerId }, { $set: { role: "COMPANY", maxCompany: 1 } });
        return Company_1.default.create(input);
    }),
    updateCompany: (_, { _id, input }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Company_1.default.findByIdAndUpdate(_id, input, {
            new: true,
        });
    }),
    deleteCompany: (_, _id) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const company = yield Company_1.default.findOne({ ownerId: _id });
        const { n } = yield Company_1.default.deleteOne({ ownerId: _id });
        yield Product_1.default.deleteMany({ companyId: company._id });
        yield User_1.default.updateOne({ _id: _id }, { $set: { role: "USER", maxCompany: 0 } });
        return n === 1
            ? { message: "Negocio eliminado" }
            : { message: "Negocio no encontrado" };
    }),
    createProduct: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        return Product_1.default.create(input);
    }),
    updateProduct: (_, { _id, input }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Product_1.default.findByIdAndUpdate(_id, input, {
            new: true,
        });
    }),
    deleteProduct: (_, _id) => __awaiter(void 0, void 0, void 0, function* () {
        const { n } = yield Product_1.default.deleteOne(_id);
        return n === 1
            ? { message: "Producto eliminado" }
            : { message: "Producto no encontrado" };
    }),
};
exports.default = Mutation;
