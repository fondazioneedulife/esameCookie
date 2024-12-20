import { Box, Stack, Typography } from "@mui/joy";
import { useState, useEffect } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";
import { config } from "../config";
import { useFetch } from "../lib/useFetch";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetch = useFetch();

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        // Effettua la chiamata API per estrarre il destinatario
        const response = await fetch(`${config.API_BASEPATH}/api/extract`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Non ci sono destinatari disponibili.");
        }

        const data: User = await response.json();
        setRecipient(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRecipient();
  }, []);

  if (error) {
    return "Mi dispiace, tutti i destinatari sono stati già estratti";
  }

  if (!recipient) {
    return <TaskBox>Attendi mentre estraggo il destinatario....</TaskBox>;
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
