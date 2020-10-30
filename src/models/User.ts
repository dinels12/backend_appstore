import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const rolesValidos = {
  values: ["ADMIN", "USER", "COMPANY", "GUEST", "TEST"],
  message: "{VALUE} no es un rol valido",
};

const userSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.ToJSON = function () {
  let user = this;
  let userObject = user.toObject;
  delete userObject.password;
  return userObject;
};

userSchema.plugin(uniqueValidator, {
  message: "El {PATH} debe de ser unico",
});

export default model("User", userSchema);
