import { Box } from "@mui/joy";
import { PropsWithChildren } from "react";

export const TaskBox: React.FC<PropsWithChildren> = ({ children }) => (
  <Box
    sx={{
      background: "rgb(255,255,255,0.2)",
      padding: 5,
      borderRadius: 10,
      fontSize: "0.7em",
    }}
  >
    {children}
  </Box>
);
