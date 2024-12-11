import Header from "./Header";
import Footer from "./Footer";
import ParticipantForm from "./ParticipantForm";
import Background from "./Background";

import { useState, useEffect } from "react";
const SecretSanta = () => {
  const [participants, setParticipants] = useState([]);

  return (
    <>
      <Header />
      <Background />

      <ParticipantForm
        participants={participants}
        setParticipants={setParticipants}
      />
      <Footer />
    </>
  );
};

export default SecretSanta;
