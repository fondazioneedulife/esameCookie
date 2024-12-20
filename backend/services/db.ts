import mongoose from "mongoose";

if (!process.env.DB_CONNECTION) {
  throw new Error("mongodb://localhost:27017/secretsanta");
}

mongoose.connect(process.env.DB_CONNECTION);

export default mongoose;
