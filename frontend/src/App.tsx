import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { config } from "./config";
import { Extract } from "./routes/Extract";
import { LoadMainPage } from "./routes/LoadMainPage";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";

function App() {
  return (
    <BrowserRouter basename={config.APP_BASENAME}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoadMainPage />} />
          <Route path="extract" element={<Extract />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
