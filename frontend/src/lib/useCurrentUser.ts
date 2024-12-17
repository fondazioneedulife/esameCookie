import { useContext } from "react";
import { useNavigate } from "react-router";
import { User } from "../../../api";
import { UserContext } from "../components/UserContext";

export const useCurrentUser = (): User | null => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return user;
};
