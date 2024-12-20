import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { useEffect, useState } from "react";
import { useFetch } from "../../lib/useFetch";

export const Done: React.FC = () => {
  const currentUser = useCurrentUser();
  const fetch = useFetch();

  const [recipient, setRecipient] = useState<{ first_name: string; last_name: string } | null>(null);

  useEffect(() => {
    if (currentUser?._id) {
      fetch(`/api/recipient/${currentUser._id}`).then((response: any) => {
        response.json().then((data: any) => {
          setRecipient(data); // Assumi che i dati restituiti siano { first_name, last_name }
        });
      });
    }
  }, [currentUser, fetch]);

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
          {recipient ? `${recipient.first_name} ${recipient.last_name}` : "Caricamento del destinatario in corso..."}
        </Typography>
      </Box>
    </Stack>
  );
};
