import { useState, useEffect } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";
const ParticipantForm = ({ participants, setParticipants }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const storedParticipants = loadFromLocalStorage("participants");
    if (storedParticipants.length > 0) {
      setParticipants(storedParticipants);
    }
  }, [setParticipants]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || mail.trim() === "") {
      alert("Le nom et l'email sont obligatoires.");
      return;
    }

    const newParticipant = {
      name: name.trim(),
      email: mail.trim(),
    };

    const updatedParticipants = [...participants, newParticipant];

    setParticipants(updatedParticipants);
    saveToLocalStorage("participants", updatedParticipants);

    // Réinitialiser les champs du formulaire
    setName("");
    setMail("");
  };

  return (
    <div className="container">
      <h2>Ajouter des participants</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du participant"
          required
        />
        <input
          type="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Mail du participant"
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ParticipantForm;
