import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { TaskBox } from "../TaskBox";
import { useEffect, useState } from "react";
import { User } from "../../../../api";
import { config } from "../../config";
import { useFetch } from "../../lib/useFetch";

// TODO Task 2 - implementa la chiamata api per recuperare il destinatario del regalo

export const Done: React.FC = () => {
  const currentUser = useCurrentUser();


  const [recipient, setRecipient] = useState<User | null>();
  
  const fetch = useFetch();

  useEffect(() => {
      const lastRecipient = async () => {
        try {
          const recipient = await fetch("http://localhost:3000/api/recipient", { method: "GET" });
          if (recipient) {
            const data = await recipient.json();
            setRecipient(data.recipient);
          }
        } catch (error) {
          setError("Errore durante l'estrazione");
        }
      };
      lastRecipient();
    }, []);
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        Ciao {currentUser?.first_name} {currentUser?.last_name}
        <br />
        Hai già estratto il destinatario del tuo regalo, <br />
        si tratta di:
      </Box>
      <Box>
        <Typography level="h2" sx={{ fontSize: "2em", mt: 5 }}>
          {recipient?.first_name} {recipient?.last_name}
        </Typography>
      </Box>

      {/** ...e poi cancella questo messaggio */}
      {/* <TaskBox>
        ... ops, non lo sappiamo!
        <br />
        Devi implementare una funzione che mi permetta di conoscere il
        destinatario del regalo!
      </TaskBox> */}
    </Stack>
  );
};
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

