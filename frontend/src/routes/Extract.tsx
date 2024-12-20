import { Box, Stack, Typography } from "@mui/joy";
import { useState, useEffect } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useCurrentUser } from "../lib/useCurrentUser";

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const extractRecipient = async () => {
      try {
        setLoading(true);
        setError(null); 

        const response = await fetch("http://localhost:3000/api/extract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });


        if (!response.ok) {
          throw new Error("Errore nel server");
        }


        const data = await response.json();


        setRecipient(data.recipient);
      } catch (err: any) {

        setError("Mi dispiace, tutti i destinatari sono stati già estratti.");
      } finally {
        setLoading(false);
      }
    };

    extractRecipient();
  }, []);


  if (error) {
    return (
      <TaskBox>
        {error}
      </TaskBox>
    );
  }


  if (loading) {
    return (
      <TaskBox>
        Attendi mentre estraggo il destinatario....
      </TaskBox>
    );
  }

  if (recipient) {
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
  }


//  return (
//    <TaskBox>
//      Mmmmhh.... mi sa che manca la funzione per estrarre il destinatario,
//      scrivila tu!
//    </TaskBox>
//  );
};
