import { Box } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";

export const Wait: React.FC = () => {
  const currentUser = useCurrentUser();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Ciao {currentUser?.first_name} {currentUser?.last_name}
      <br />
      non ci sono ancora abbastanza iscritti per poter fare l'estrazione
      <br />
      ritorna più tardi!{" "}
    </Box>
  );
};
