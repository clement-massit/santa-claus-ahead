import { useState, useEffect, useRef } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "./localStorage";
import emailjs from "emailjs-com";
import a from "/src/1.png";
import b from "/src/2.png";

const pictures = {
  pers1: a,
  pers2: b,
};
console.log(pictures);
const ParticipantForm = ({ participants, setParticipants }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pairs, setPairs] = useState([]);
  const adminEmail = "clement.massit@u-bordeaux.fr";
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const formRef = useRef();

  // Charger les participants depuis le localStorage
  useEffect(() => {
    const storedParticipants = loadFromLocalStorage("participants");
    const storedCurrentUserEmail = loadFromLocalStorage("currentUser");
    if (storedParticipants.length > 0) {
      setParticipants(storedParticipants);
    }
    if (storedCurrentUserEmail) {
      setCurrentUserEmail(storedCurrentUserEmail);
    }
  }, [setParticipants]);
  // Mélange aléatoire d'un tableau
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Générer les paires aléatoires
  const generatePairs = () => {
    if (participants.length < 2) {
      alert(
        "Vous avez besoin d'au moins 2 participants pour générer des paires !"
      );
      return;
    }

    const shuffledParticipants = shuffleArray(participants);
    const generatedPairs = shuffledParticipants.map((participant, index) => {
      const recipient =
        shuffledParticipants[(index + 1) % shuffledParticipants.length];
      console.log(recipient);
      console.log(participant);
      return {
        giver_name: participant.name,
        giver_email: participant.email,
        receiver_name: recipient.name,
        receiver_email: recipient.email,
      };
    });

    setPairs(generatedPairs);
  };

  // Gérer l'ajout d'un participant
  const handleSubmit = (e) => {
    e.preventDefault();
    removeFromLocalStorage("currentUser");
    setCurrentUserEmail("");
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

    removeFromLocalStorage("currentUser");
    setCurrentUserEmail(mail.trim());
    saveToLocalStorage("currentUser", mail.trim());

    setName("");
    setMail("");
    console.log(currentUserEmail);
  };

  // Envoi des paires par email
  const sendEmail = (e) => {
    e.preventDefault();

    if (pairs.length === 0) {
      alert("Aucune paire n'a été générée.");
      return;
    }

    pairs.forEach((pair) => {
      console.log(pair);

      const templateParams = {
        giver_name: pair.giver_name,
        receiver_name: pair.receiver_name,
        giver_email: pair.giver_email,
        message: "Tu dois offrir un putain de kdo à : " + pair.receiver_name,
        img: pictures.pers1,
      };
      console.log(templateParams);
      emailjs
        .send(
          "service_7wfh5wk", // Remplacez par votre service ID
          "template_kw2pe0f", // Remplacez par votre template ID
          templateParams,
          "puDXm3wchAQDhNP9Z" // Remplacez par votre clé publique
        )
        .then(
          () => {
            console.log(`Email envoyé avec succès pour ${pair.giver}`);
          },
          (error) => {
            console.error("Erreur lors de l'envoi de l'email :", error);
          }
        );
    });
  };

  return (
    <div className="container">
      {/* {console.log("participants", participants)}
      {console.log("current", currentUserEmail)} */}
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
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Email du participant"
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            {participant.name} ({participant.email}){" "}
            <button
              onClick={() => {
                const updatedParticipants = participants.filter(
                  (_, i) => i !== index
                );
                setParticipants(updatedParticipants);
                saveToLocalStorage("participants", updatedParticipants);
                if (participant.email === currentUserEmail) {
                  removeFromLocalStorage("currentUser");
                  setCurrentUserEmail("");
                }
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* <div className="container">
        <h2>Assignation des paires</h2>
        <button onClick={generatePairs}>Générer les paires</button>
        {pairs.length > 0 && (
          <div>
            <h3>Résultats :</h3>
            <ul>
              {pairs.map((pair, index) => (
                <li key={index}>
                  🎁 {pair.giver} offre un cadeau à {pair.receiver}
                </li>
              ))}
            </ul>
            <form ref={formRef} onSubmit={sendEmail}>
              <button type="submit">Envoyer les paires par email</button>
            </form>
          </div>
        )}
      </div> */}

      {currentUserEmail === adminEmail && (
        <div className="admin-section">
          <h3>Administrateur : {adminEmail}</h3>
          {currentUserEmail === adminEmail ? (
            <div className="pairing-container">
              <h2>Assignation des paires</h2>
              <button onClick={generatePairs}>Générer les paires</button>
              {pairs.length > 0 && (
                <div>
                  <h3>Résultats :</h3>
                  <ul>
                    {pairs.map((pair, index) => (
                      <li key={index}>
                        🎁 {pair.giver} offre un cadeau à {pair.receiver}
                      </li>
                    ))}
                  </ul>
                  <form ref={formRef} onSubmit={sendEmail}>
                    <button type="submit">Envoyer les paires par email</button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <p>Seul l'administrateur ({adminEmail}) peut générer les paires.</p>
          )}
        </div>
      )}

      {/* <img src={pictures.pers1} alt="caca" /> */}
    </div>
  );
};

export default ParticipantForm;
