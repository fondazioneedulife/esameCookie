import { Box, Stack, Typography } from "@mui/joy";
import { useState, useEffect } from "react";
import { User } from "../../../api";
import { TaskBox } from "../components/TaskBox";
import { useFetch } from "../lib/useFetch";
import { config } from "../config";

export const Extract: React.FC = () => {
  const [recipient, setRecipient] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetch = useFetch();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/api/extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res) {
          res.json().then((data) => {
            setRecipient(data);
          });
        } else {
          setError("Errore durante l'estrazione del destinatario");
        }
      })
      .catch((err) => {
        setError("Errore di rete o del server");
        console.error(err);
      });
  }, []);

  if (error) {
    return <TaskBox>{error}</TaskBox>;
  }

  if (!recipient) {
    return (
      <TaskBox>
        Attendi mentre estraggo il destinatario...
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
        <Typography level="h1" sx={{ fontSize: "3em", mb: 5 }}>
          Regalo di Natale
        </Typography>
        <Typography level="h2" sx={{ fontSize: "2em", mt: 5 }}>
          {recipient.first_name} {recipient.last_name}
        </Typography>
      </Box>
    </Stack>
  );
};
