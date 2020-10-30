import User from "../../models/User";
import Product from "../../models/Product";
import Company from "../../models/Company";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

interface UserInterface {
  _id: any;
  nick: string;
  name: string;
  lastname: string;
  dateBirth: string;
  email: string;
  password: string;
  createdAt: string;
  role: string;
  maxCompany: number;
  lastLogin: string;
  balance: number;
  banned: boolean;
}

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

const randomNick = (name: string, lastname: string) =>
  name.toLowerCase() +
  lastname.toLowerCase() +
  "#" +
  Math.round(Math.random() * 9999);

const Mutation = {
  userLogin: async (_: any, { email, password }: UserInterface) => {
    let user: any = await User.findOne({ email });
    if (!user) {
      return { message: "Correo electronico incorrecto" };
    }
    if (!bcrypt.compareSync(password, user.password)) {
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
    const token = jwt.sign(
      {
        user,
      },
      // @ts-ignore
      config.SEED_AUTENTICACION,
      {
        expiresIn: "7d",
      }
    );
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogin: Date.now(),
        },
      }
    );

    return { message: "Inicio de sesion exitoso", token };
  },

  createUser: async (_: any, { input }: any) => {
    const { nick, role, name, lastname, email, password } = input;

    const newUser = new User({
      role,
      nick: nick || randomNick(name, lastname),
      name,
      lastname,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    return await newUser.save();
  },

  updateUser: async (_: any, { _id, input }: any) =>
    await User.findByIdAndUpdate(_id, input, {
      new: true,
    }),

  deleteUser: async (_: any, _id: any) => {
    const { n } = await User.deleteOne(_id);
    return n === 1
      ? { message: "Usuario eliminado" }
      : { message: "Usuario no encontrado" };
  },

  createCompany: async (_: any, { input }: any) => {
    await User.updateOne(
      { _id: input.ownerId },
      { $set: { role: "COMPANY", maxCompany: 1 } }
    );
    return Company.create(input);
  },

  updateCompany: async (_: any, { _id, input }: any) => {
    return await Company.findByIdAndUpdate(_id, input, {
      new: true,
    });
  },

  deleteCompany: async (_: any, _id: any) => {
    // @ts-ignore
    const company: CompanyInterface = await Company.findOne({ ownerId: _id });
    const { n } = await Company.deleteOne({ ownerId: _id });
    await Product.deleteMany({ companyId: company._id });
    await User.updateOne(
      { _id: _id },
      { $set: { role: "USER", maxCompany: 0 } }
    );
    return n === 1
      ? { message: "Negocio eliminado" }
      : { message: "Negocio no encontrado" };
  },

  createProduct: async (_: any, { input }: any) => {
    return Product.create(input);
  },

  updateProduct: async (_: any, { _id, input }: any) => {
    return await Product.findByIdAndUpdate(_id, input, {
      new: true,
    });
  },

  deleteProduct: async (_: any, _id: any) => {
    const { n } = await Product.deleteOne(_id);
    return n === 1
      ? { message: "Producto eliminado" }
      : { message: "Producto no encontrado" };
  },
};
export default Mutation;
