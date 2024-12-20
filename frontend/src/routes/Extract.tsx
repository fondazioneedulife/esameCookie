import { Box, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { User, Status } from "../../../api";
import { useCurrentUser } from "../lib/useCurrentUser";
import { config } from "../config";
import { useFetch } from "../lib/useFetch";
import { useEffect } from "react";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>();
  const [error, setError] = useState();
  const [status, setStatus] = useState<Status>();

  const fetch = useFetch();

  useEffect(() => {
      fetch(`${config.API_BASEPATH}/api/extract`, {
        method: "POST",
        body: JSON.stringify(currentUser),
        headers: { "Content-Type": "application/json" },
    })
      .then((res) => res && res.json())
      .then((data) => {
        setRecipient(data);
      })
      .catch((e) => {
        setError(e);
      });
    }, []);

  if (error) {
    return "Mi dispiace, tutti i destinatari sono stati già estratti";
  }

  if (!recipient) {
    return "Attendi mentre estraggo il destinatario....";
  }

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        Complimenti {currentUser?.first_name} {currentUser?.last_name}
        <br />
        il destinatario del tuo regalo di Natale sarà:
      </Box>
      <Box>
        <Typography level="h2" sx={{ fontSize: "2em", mt: 5 }}>
          {recipient?.first_name} {recipient?.last_name}
        </Typography>
      </Box>
    </Stack>
  );
};
