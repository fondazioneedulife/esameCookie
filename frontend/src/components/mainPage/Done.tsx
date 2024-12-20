import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { useEffect, useState } from "react";
import { User } from "../../../../api";
import { config } from "../../config";
import { useFetch } from "../../lib/useFetch";
import { useNavigate } from "react-router-dom";

// TODO Task 2 - implementa la chiamata api per recuperare il destinatario del regalo

export const Done: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>();
  const navigate = useNavigate();

  const fetch = useFetch();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/api/recipient`, {
      method: "GET",
      body: JSON.stringify(currentUser?._id),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res && res.json())
      .then((data) => {
        setRecipient(data);
      })
      .catch((e) => {
        // navigate("/extract");
        navigate("/");
      });
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
    </Stack>
  );
};
