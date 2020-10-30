import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
// @ts-ignore
//  @denial-code
const ObjectId = Schema.ObjectId;

const adPlans = {
  values: ["Free", "Basic", "Pro"],
  message: "{VALUE} no es un plan valido",
};

const adSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

adSchema.plugin(uniqueValidator, {
  message: "El {PATH} debe de ser unico",
});

export default model("Ad", adSchema);
