import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
// @ts-ignore
const ObjectId = Schema.ObjectId;

const publishPlan = {
  values: ["Free", "Basic", "Pro"],
  message: "{VALUE} no es un plan valido",
};

const productSchema = new Schema(
  {
    title: String,
    description: String,
    imageURL: { type: String, trim: true },
    public_id: { type: String },
    companyId: { type: ObjectId, required: true },
    stock: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    coords: {
      longitud: String,
      latitude: String,
    },
    plan: {
      type: String,
      default: "Free",
      required: [true],
      enum: publishPlan,
    },
    publishAds: { type: Number, default: 1000 },
  },
  { versionKey: false, timestamps: true }
);

productSchema.plugin(uniqueValidator, {
  message: "El {PATH} debe de ser unico",
});

export default model("Product", productSchema);
