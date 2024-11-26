import { useState, useRef } from "react";
import { Resend } from "resend";
import { Email } from "./email";

// const form = useRef();
// ("use server");
// re_g2GdzTKA_9kybs71JzPstSkeLUSXn81hw

const PairingLogic = ({ participants }) => {
  const [pairs, setPairs] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
      return { giver: participant, receiver: recipient };
    });

    setPairs(generatedPairs);
  };

  async function send() {
    "use server";

    const resend = new Resend("re_g2GdzTKA_9kybs71JzPstSkeLUSXn81hw");

    const { data } = await resend.emails.send({
      from: "smtp.resend.com",
      to: "clement.massit@u-bordeaux.fr",
      subject: "hello world",
      react: <Email />,
    });

    console.log(data);
  }

  return (
    <div className="container">
      <h2>Assignation des paires</h2>
      <button onClick={generatePairs}>Générer les paires</button>
      {participants}
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
        </div>
      )}

      <form>
        <button type="submit" onClick={send}>
          Send email
        </button>
      </form>
    </div>
  );
};

export default PairingLogic;
