import { Box, Container } from "@mui/joy";
import { Link, Outlet } from "react-router-dom";
import santaclaus from "../assets/santaclaus.svg";
import { AnimatedBackground } from "./AnimatedBackground";
import "./layout.css";

export const Layout: React.FC = () => {
  return (
    <>
      <Box>
        <h1 className="main-title">
          <Link to="/">Secret Santa</Link>
        </h1>
      </Box>
      <Box
        className="logout"
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "sm",
        }}
      >
        <Link to="/logout">Logout</Link>
      </Box>
      <Container maxWidth="md" className="main-content">
        <Container>
          <Outlet />
        </Container>
      </Container>
      <img src={santaclaus} alt="" className="image" />
      <AnimatedBackground />
      <a
        href="https://www.vectorstock.com/royalty-free-vector/flying-santa-claus-vector-6806163"
        className="attribution"
        target="_blank"
      >
        Vector image by VectorStock / artshock
      </a>
    </>
  );
};
