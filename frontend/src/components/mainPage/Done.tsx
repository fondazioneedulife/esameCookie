import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { useEffect, useState } from "react";
import { User } from "../../../../api";
import { config } from "../../config";
import { useFetch } from "../../lib/useFetch";

export const Done: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>(null);
  const fetch = useFetch();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/api/extract`)
      .then((res) => res?.json())
      .then((data: { deliveredBy: User }) => {
        const deliveredBy = data.deliveredBy;
        setRecipient(deliveredBy);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetch]);

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