import User from "../../models/User";
import Product from "../../models/Product";
import Company from "../../models/Company";
import jwt from "jsonwebtoken";
import config from "../../config";

interface CompanyInterface {
  _id: any;
  nick: string;
  name: string;
  location: string;
  description: string;
  ownerId: any;
  active: boolean;
  schedule: string;
  maxProductActive: number;
  planPayDate: string;
}

const verifyToken = async ({ token }: any) => {
  if (!token) return { message: "Token not found" };
  const {
    user: { _id },
    // @ts-ignore
  } = jwt.verify(token, config.SEED_AUTENTICACION);
  return await User.findById(_id);
};

const Query = {
  getServerData: async () => {
    const users = await User.find({ role: ["USER", "COMPANY"] });
    const companies = await Company.find();
    return { users, companies };
  },
  getUser: (_: any, token: string) => {
    return verifyToken(token);
  },
  getProduct: async (_: any, { id }: any) => await Product.findById(id),

  getUsers: async () => await User.find({ role: ["USER", "COMPANY"] }),
  getCompany: async (_: any, ownerId: any) => {
    // @ts-ignore
    const company: CompanyInterface = await Company.findOne(ownerId);
    const products = await Product.find({ companyId: company._id });
    return { company, products };
  },
  getCompanies: async () => await Company.find(),

  getPublicShop: async (_: any, { nick }: any) => {
    // @ts-ignore
    const company: CompanyInterface = await Company.findOne({
      nick,
      active: true,
    });
    if (company) {
      const products = await Product.find({
        companyId: company._id,
        active: true,
      }).limit(company.maxProductActive);
      return { company, products };
    }
    return company;
  },
};

export default Query;
