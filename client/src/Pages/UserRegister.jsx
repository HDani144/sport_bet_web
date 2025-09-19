import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../Forms/RegisterForm";
import Modal from "../Components/Modal";

const registerUser = async (user) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return res.json();
};

export default function UserRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (user) => {
    setLoading(true);

    try {
      const data = await registerUser(user);

      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RegisterForm
        onSave={handleRegister}
        disabled={loading}
        onCancel={() => navigate("/")}
      />
      <Modal message={error} onClose={() => setError("")} />
    </>
  );
}
