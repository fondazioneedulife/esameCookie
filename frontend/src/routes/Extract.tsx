import { Box, Stack, Typography, Button } from "@mui/joy";
import { useState, useEffect } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";
// import { config } from "../config";
// import { useFetch } from "../lib/useFetch";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null); // Stato per il destinatario estratto
  const [error, setError] = useState<string | null>(null); // Stato per eventuali errori
  const [loading, setLoading] = useState<boolean>(false); // Stato per gestire il caricamento

  // Funzione per estrarre il destinatario
  const extractRecipient = async () => {
    try {
      setLoading(true); // Inizia il caricamento
      const response = await fetch("http://localhost:3000/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?._id, // Invia l'id dell'utente corrente
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Imposta il destinatario estratto
        setRecipient(data.recipient);
        setError(null); // Resetta eventuali errori
      } else {
        // Gestisci errore, ad esempio se l'utente ha già estratto un destinatario
        setError(data.message || "Errore sconosciuto");
      }
    } catch (error) {
      setError("Si è verificato un errore nella connessione con il server.");
    } finally {
      setLoading(false); // Ferma il caricamento
    }
  };

  useEffect(() => {
    if (!recipient) {
      extractRecipient(); // Se non c'è destinatario, prova a estrarlo all'inizio
    }
  }, [recipient]);

  // Se c'è un errore, mostralo
  if (error) {
    return (
      <TaskBox>
        <Typography level="h3" color="danger">
          {error}
        </Typography>
      </TaskBox>
    );
  }

  // Se non c'è ancora un destinatario, mostra il messaggio di caricamento
  if (loading || !recipient) {
    return (
      <TaskBox>
        <Typography level="h3">Attendi mentre estraggo il destinatario...</Typography>
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
      <Button
        sx={{ mt: 4 }}
        onClick={() => window.location.href = '/recipient'} // Reindirizza alla pagina di recipient
      >
        Visualizza destinatario
      </Button>
    </Stack>
  );
};

export const Visualize: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Funzione per ottenere il destinatario estratto
  const fetchRecipient = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/recipient", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setRecipient(data.recipient.name);
        setError(null);
      } else {
        setError(data.message || "Errore sconosciuto");
      }
    } catch (error) {
      setError("Si è verificato un errore nella connessione con il server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipient(); // Carica il destinatario all'inizio
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography level="h3">Caricamento del destinatario...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography level="h3" color="danger">
          {error}
        </Typography>
      </Box>
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
      {recipient ? (
        <>
          <Box>
            Complimenti {currentUser?.first_name} {currentUser?.last_name}
            <br />
            il destinatario del tuo regalo di Natale sarà:
          </Box>
          <Typography level="h2" sx={{ fontSize: "2em", mt: 5 }}>
            {recipient}
          </Typography>
        </>
      ) : (
        <Box>
          Nessun destinatario è stato estratto.
        </Box>
      )}
    </Stack>
  );
};