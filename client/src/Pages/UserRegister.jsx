import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../Forms/RegisterForm";

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

  const handleRegister = async (user) => {
    setLoading(true);

    try {
      const data = await registerUser(user);

      if (data.success) {
        console.log("Registered user:", data.user);
        alert("Registration successful");
        navigate("/login");
    } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSave={handleRegister}
      disabled={loading}
      onCancel={() => navigate("/")}
    />
  );
}
