import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";
import Modal from "../Components/Modal";

export default function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function handleLogin(user) {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookie-t küld a szervernek
        body: JSON.stringify(user),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Nem sikerült JSON-t olvasni a response-ból:", err);
      }

      if (!res.ok) {
        throw new Error(data?.message || "Hibás bejelentkezési adatok");
      }

      if (data.success) {
        // Token már cookie-ban van, így nem kell localStorage
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("subscriber", data.user.subscriber);
        setModalMessage("Sikeres bejelentkezés!");

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      } else {
        setModalMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setModalMessage(error.message || "Hiba történt, próbáld újra.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoginForm onSave={handleLogin} disabled={loading} />
      <Modal message={modalMessage} onClose={() => setModalMessage("")} />
    </>
  );
}
