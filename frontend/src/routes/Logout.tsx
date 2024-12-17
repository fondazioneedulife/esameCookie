import { useContext } from "react";
import { useNavigate } from "react-router";
import { SetUserContext } from "../components/UserContext";
import { config } from "../config";
import { useFetch } from "../lib/useFetch";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const fetch = useFetch();
  const setuser = useContext(SetUserContext);

  fetch(`${config.API_BASEPATH}/auth/logout`)
    .then(() => setuser(null))
    .then(() => navigate("/"))
    .catch(console.error);

  return "Logging out...";
};
