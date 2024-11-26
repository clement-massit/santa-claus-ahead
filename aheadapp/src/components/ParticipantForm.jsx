import { useState } from "react";

const ParticipantForm = ({ setParticipants }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setParticipants((prev) => [
        ...prev,
        { name: name.trim(), mail: mail.trim() },
      ]);
      setName("");
      setMail("");
    }
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
