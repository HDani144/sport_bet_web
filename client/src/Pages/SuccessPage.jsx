import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Components/Modal";

export default function SuccessPage() {
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paid = params.get("paid");

    if (paid === "true") {
      setModalMessage("Fizetés sikeres! Köszönjük az előfizetést.");
    } else {
      navigate("/"); // Ha valaki közvetlenül írja be a /success-t, vissza a főoldalra
    }
  }, [location, navigate]);

  return (
    <div>
      <Modal
        message={modalMessage}
        onClose={() => {
          setModalMessage(null);
          navigate("/"); // Bezáráskor vissza a főoldalra
        }}
      />
    </div>
  );
}
