import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { TaskBox } from "../TaskBox";
// import { useEffect, useState } from "react";
// import { User } from "../../../../api";
// import { config } from "../../config";
// import { useFetch } from "../../lib/useFetch";

// TODO Task 2 - implementa la chiamata api per recuperare il destinatario del regalo

export const Done: React.FC = () => {
  const currentUser = useCurrentUser();

  // const fetch = useFetch();

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
          {/** Metti qui il nome e cognome del destinatario */}
        </Typography>
      </Box>

      {/** ...e poi cancella questo messaggio */}
      <TaskBox>
        ... ops, non lo sappiamo!
        <br />
        Devi implementare una funzione che mi permetta di conoscere il
        destinatario del regalo!
      </TaskBox>
    </Stack>
  );
};
