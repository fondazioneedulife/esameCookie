import { Box, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useFetch } from "../lib/useFetch";
import { config } from "../config";
// import { config } from "../config";
// import { useFetch } from "../lib/useFetch";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetch = useFetch();

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/api/extract`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        });
        const user: User = await response.json();
        setRecipient(user);
      } catch (err) {
        console.error("Errore nella richiesta API:", err);
        setError("Errore nella richiesta API");
      }
    };
    if (currentUser) {
      fetchRecipient();
    }
  }, []);

  

  if (error) {
    return "Mi dispiace, tutti i destinatari sono stati già estratti";
  }

  if (!recipient) {
    return (
      <TaskBox>
        Mmmmhh.... mi sa che manca la funzione per estrarre il destinatario,
        scrivila tu!
      </TaskBox>
    ); // quando hai finito, togli questa riga e usa la seguente
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
