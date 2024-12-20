import { User } from "../../api";
import DB from "./db";

const userSchema = new DB.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recipient: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const UserModel = DB.model("user", userSchema);


export const find = async (id: string) => {
  return UserModel.findById(id);
};


export const add = async (
  user: Omit<User, "_id" | "created_at" | "updated_at">,
) => {
  const UserData = new UserModel(user);
  return UserData.save();
};


export const getRecipient = async (userId: string) => {
  const user = await UserModel.findById(userId);
  const recipientId = user?.get("recipient");
  if (recipientId) {
    const recipient = await UserModel.findById(recipientId);
    const recipientObject = recipient && recipient.toObject();
    const { password, ...filtered } = recipientObject;
    return filtered;
  }
};
