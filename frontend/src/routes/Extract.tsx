import { Box, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  

  const fetchRecipient = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await fetch("http://localhost:3000/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Usa il token salvato
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante l'estrazione");
      }

      const data = await response.json();
      setRecipient(data.recipient); // Aggiorna lo stato con il destinatario
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // Fine del caricamento
    }
  };

  // Effetto per chiamare fetchRecipient all'avvio
  useEffect(() => {
    fetchRecipient();
  }, []);

  // Gestione degli stati
  if (loading) {
    return "Attendi mentre estraggo il destinatario...";
  }

  if (error) {
    return (
      <TaskBox>
        Mi dispiace, tutti i destinatari sono stati già estratti: {error}
      </TaskBox>
    );
  }

  if (!recipient) {
    return (
      <TaskBox>
        Mmmmhh.... mi sa che manca la funzione per estrarre il destinatario,
        scrivila tu!
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
