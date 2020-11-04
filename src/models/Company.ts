import { Schema, model, isValidObjectId } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
// @ts-ignore
// @denial-code
const ObjectId = Schema.ObjectId;

const companyPlans = {
  values: ["Starter", "Basic", "Pro", "Premium"],
  message: "{VALUE} no es un plan valido",
};

const companySchema = new Schema(
  {
    nick: { type: String, unique: true, required: true },
    name: {
      type: String,
      required: [true, "El nombre de la empresa es necesario"],
      unique: true,
    },
    location: { type: String, required: [true, "La ubicacion es necesaria"] },
    coords: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
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
  },
  { versionKey: false, timestamps: true }
);

companySchema.plugin(uniqueValidator, {
  message: "El {PATH} debe de ser unico",
});

export default model("Company", companySchema);
