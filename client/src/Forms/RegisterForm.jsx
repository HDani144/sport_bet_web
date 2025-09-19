import { useState } from "react";
import Modal from "../Components/Modal"; 

export default function RegisterForm({ onSave, disabled, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("A jelszó és a megerősítés nem egyezik!");
      return;
    }

    onSave({ name, email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            disabled={disabled}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            disabled={disabled}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            disabled={disabled}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            disabled={disabled}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <div>
          <button type="submit" disabled={disabled}>Register</button>
          {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>

      
      <Modal message={error} onClose={() => setError("")} />
    </>
  );
}
