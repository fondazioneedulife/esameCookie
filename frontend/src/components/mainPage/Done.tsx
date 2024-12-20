import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { User } from "../../../../api";
import { config } from "../../config";
import { useFetch } from "../../lib/useFetch";

// TODO Task 2 - implementa la chiamata api per recuperare il destinatario del regalo

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The Done component displays a congratulatory message to the current user
 * indicating that they have already extracted the recipient of their gift.
 * It shows the user's name and provides a placeholder to display the name
 * and surname of the recipient. If the recipient's details are not available,
 * it prompts the user to implement the necessary logic to fetch the recipient's information.
 */

/******  eea55d9f-320b-4c82-b0cc-7493624bd8e1  *******/export const Done: React.FC = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<User | null>(null);
  const fetch = useFetch();

  useEffect(() => {
  const refetchRecipient = async () => {
    try {
      const response = await fetch(${config.API_BASEPATH}/api/recipient);
      const user: User = await response.json();
      setRecipient(user);
    } catch (err) {
      navigate("/");
    }
  };
  if (currentUser) {
    refetchRecipient();
  }
 },[]);


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