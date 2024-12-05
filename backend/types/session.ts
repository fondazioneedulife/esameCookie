import { User } from "../../api";

export type SessionUser = Omit<User, "password">;

export type AuthenticatedContext = {
  session: {
    authenticated: boolean;
    user: SessionUser;
  };
};
