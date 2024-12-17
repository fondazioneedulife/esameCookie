import { Box, Button, Checkbox, Input, Typography } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { User } from "../../../api";
import { SetUserContext } from "../components/UserContext";
import { config } from "../config";

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setCurrentUser = useContext(SetUserContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Inserisci sia l'email che la password.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${config.API_BASEPATH}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Errore: ${response.status}`);
      }

      const data: User = await response.json();
      setCurrentUser(data);
      navigate("/");
    } catch (error) {
      setError("Credenziali errate o problema con il server.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography level="h3" component="h3" sx={{ mb: 2 }}>
        Accedi
      </Typography>

      {/* Input per inserire l'email */}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </FormControl>

      {/* Input per inserire la password */}
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Inserisci la tua password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </FormControl>
      <Checkbox
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
        label="Mostra password"
        sx={{ mb: 2 }}
      />

      {/* Messaggio di errore */}
      {error && <Typography sx={{ mb: 2, color: "#fff" }}>{error}</Typography>}

      <Button type="submit" variant="solid" color="primary" size="lg" fullWidth>
        Login
      </Button>

      <Box sx={{ fontSize: "sm", mt: 2 }}>
        Non ti sei ancora registrato? <Link to="/register">Resigtrati ora</Link>
      </Box>
    </form>
  );
};
