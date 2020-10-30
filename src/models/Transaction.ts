import { Schema, model } from "mongoose";
// @ts-ignore
const ObjectId = Schema.ObjectId;

const transactionSchema = new Schema(
  {
    createdId: { type: ObjectId, required: true },
    description: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default model("Transaction", transactionSchema);
