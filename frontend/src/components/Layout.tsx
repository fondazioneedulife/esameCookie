import { Container } from "@mui/joy";
import { Outlet } from "react-router-dom";
import santaclaus from "../assets/santaclaus.svg";
import { AnimatedBackground } from "../lib/AnimatedBackground";
import "./layout.css";

export const Layout: React.FC = () => {
  return (
    <>
      <Container maxWidth={false}>
        <Container>
          <h1>Secret Santa</h1>
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
