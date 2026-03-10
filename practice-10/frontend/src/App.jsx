import { useState } from "react";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "register") {
    return <RegisterPage onSwitchPage={() => setPage("login")} />;
  }

  return <LoginPage onSwitchPage={() => setPage("register")} />;
}
