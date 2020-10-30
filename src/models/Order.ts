import { Schema, model } from "mongoose";
// @ts-ignore
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema(
  {
    userId: { type: ObjectId, required: true },
    productId: { type: ObjectId, required: true },
    productName: { type: String },
    productPrice: { type: Number },
    amount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    payStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    payAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

export default model("Ticket", orderSchema);
