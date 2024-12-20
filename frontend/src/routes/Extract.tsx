import { Box, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useFetch } from "../lib/useFetch";

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [status, setStatus] = useState<"WAIT" | "PLAY" | "DONE" | null>(null);

  const fetch = useFetch();

  // Controlla lo stato al caricamento del componente
  useEffect(() => {
    const checkStatus = async () => {
      const response = await fetch("http://localhost:3000/api/status");
      const data = await response.json();
      setStatus(data.status);
    };

    checkStatus();
  }, []);


  const extractRecipient = async () => {
    const response = await fetch("http://localhost:3000/api/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRecipient(data.recipient);
  };
  

  // Effettua l'estrazione se lo stato è PLAY
  useEffect(() => {
    if (status === "PLAY" && !recipient) {
      extractRecipient();
    }
  }, [status, recipient]);

  // Renderizza i dati o un messaggio di attesa
  if (!recipient) {
    return (
      <TaskBox>
        {status === "WAIT"
          ? "Attendi, non ci sono ancora abbastanza iscritti..."
          : "Attendi mentre estraggo il destinatario..."}
      </TaskBox>
    );
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
