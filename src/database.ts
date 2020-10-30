import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config";

const uri: any = config.DB;
const mongooseOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

(async () => {
  try {
    await mongoose.connect(uri, mongooseOptions);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
})();
