import { useState } from "react";

export default function LoginForm({ onSave, disabled }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button type="submit" disabled={disabled}>Login</button>
    </form>
  );
}
