import { User } from "../../api";
import { SessionUser } from "../types/session";
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

/**
 * Visualizza un utente
 */
export const view = async (id: string, currentUser?: SessionUser) => {
  return UserModel.findById(id);
};

/**
 * Aggiunge un nuovo utente
 */
export const add = async (
  user: Omit<User, "_id" | "created_at" | "updated_at">,
) => {
  const UserData = new UserModel(user);
  return UserData.save();
};
