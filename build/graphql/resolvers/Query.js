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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const verifyToken = ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        return { message: "Token not found" };
    const { user: { _id }, } = jsonwebtoken_1.default.verify(token, config_1.default.SEED_AUTENTICACION);
    return yield User_1.default.findById(_id);
});
const Query = {
    getServerData: () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.default.find({ role: ["USER", "COMPANY"] });
        const companies = yield Company_1.default.find();
        return { users, companies };
    }),
    getUser: (_, token) => {
        return verifyToken(token);
    },
    getProduct: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () { return yield Product_1.default.findById(id); }),
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () { return yield User_1.default.find({ role: ["USER", "COMPANY"] }); }),
    getCompany: (_, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const company = yield Company_1.default.findOne(ownerId);
        const products = yield Product_1.default.find({ companyId: company._id });
        return { company, products };
    }),
    getCompanies: () => __awaiter(void 0, void 0, void 0, function* () { return yield Company_1.default.find(); }),
    getPublicShop: (_, { nick }) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const company = yield Company_1.default.findOne({
            nick,
            active: true,
        });
        if (company) {
            const products = yield Product_1.default.find({
                companyId: company._id,
                active: true,
            }).limit(company.maxProductActive);
            return { company, products };
        }
        return company;
    }),
};
exports.default = Query;
