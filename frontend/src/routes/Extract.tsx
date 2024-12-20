import { Box, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";
import { config } from "../config";
import { useFetch } from "../lib/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>();
  const [error] = useState();
  const fetch = useFetch();
  // const setRecipient = (recipient: User | null) => {
  //   setRecipient(recipient);
  // };

   useEffect(() => {
    const extractRecipient = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/extract", { method: "POST" });
        // const data = await response.json();
        if (response) {
          const data = await response.json();
          setRecipient(data.recipient);
        }
      } catch (error) {
        setError("Errore durante l'estrazione");
      }
    };
    extractRecipient();
  }, [fetch]);

  if (error) {
    return "Mi dispiace, tutti i destinatari sono stati già estratti";
  }

  if (!recipient) {
    // return (
      // <TaskBox>
      //   Mmmmhh.... mi sa che manca la funzione per estrarre il destinatario,
      //   scrivila tu!
      // </TaskBox>
    // );

    //pezzo giusto che sestituise il messaggio precedente
    return "Attendi mentre estraggo il destinatario....";
  }

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipient");

        if (!response.ok) {
          if (response.status === 400) {
            // Se il server risponde con 400, l'utente non ha estratto il destinatario
            navigate("/extract"); // Reindirizza alla pagina di estrazione
          } else {
            setError("Errore durante il recupero del destinatario.");
          }
          return;
        }

        const data = await response.json();
        setRecipient(data.recipient);
      } catch (error) {
        setError("Errore durante il recupero del destinatario.");
      }
    };

    fetchRecipient();
  }, [fetch, navigate]);
  
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
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}



