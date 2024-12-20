import { Box, Stack, Typography } from "@mui/joy";
import { useState, useEffect } from "react";
import { User } from "../../../api";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useNavigate } from "react-router-dom";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<Partial<User> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      getDestinatario();
    }
  }, [currentUser, navigate]);

  const getDestinatario = () => {
    fetch("http://localhost:3000/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipient(data);
      })
      .catch((error) => {
        setError("Mi dispiace, tutti i destinatari sono stati già estratti");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipient) {
    return <div>Attendi mentre estraggo il destinatario....</div>;
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
