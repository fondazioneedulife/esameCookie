import { Box, Button, Stack } from "@mui/joy";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../lib/useCurrentUser";

export const Play: React.FC = () => {
  const currentUser = useCurrentUser();

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
        estrai il nome del destinatario del tuo prossimo regalo di Natale
      </Box>
      <Box>
        <Link to="/extract">
          <Button size="lg">Estrai adesso!</Button>
        </Link>
      </Box>
    </Stack>
  );
};
