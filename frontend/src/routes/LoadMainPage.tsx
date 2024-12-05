import { Container } from "@mui/joy";
import { Outlet } from "react-router-dom";

export const LoadMainPage: React.FC = () => {
  return (
    <Container>
      Load main page
      <Outlet />
    </Container>
  );
};
