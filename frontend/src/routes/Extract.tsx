import { Box, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { User } from "../../../api";
import { useCurrentUser } from "../lib/useCurrentUser";
 import { config } from "../config";
 import { useFetch } from "../lib/useFetch";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>();
  const [error] = useState();

  const fetch = useFetch();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/api/extract`)
      .then((res) => res?.json())
      .then((recipient: User | null) => {
        setRecipient(recipient);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

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
