import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../api";
import { Loading } from "../components/Loading";
import { Done } from "../components/mainPage/Done";
import { Play } from "../components/mainPage/Play";
import { Wait } from "../components/mainPage/Wait";
import { config } from "../config";
import { useFetch } from "../lib/useFetch";

export const LoadMainPage: React.FC = () => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/api/status`)
      .then((res) => res && res.json())
      .then(({ status }) => setStatus(status))
      .catch((e) => {
        navigate("/login");
      });
  }, []);

  switch (status) {
    case "WAIT":
      return <Wait />;
    case "PLAY":
      return <Play />;
    case "DONE":
      return <Done />;
    default:
      return <Loading />;
  }
};
