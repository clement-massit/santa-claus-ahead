import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ParticipantForm from "./components/ParticipantForm";
import Background from "./components/Background";
// import "./App.css";
import "./style.css";

function App() {
  const [participants, setParticipants] = useState([]);
  return (
    <>
      <Header />
      <Background />

      <ParticipantForm
        participants={participants}
        setParticipants={setParticipants}
      />
      {/* <PairingLogic participants={participants.map((p) => p.name)} /> */}
      <Footer />
    </>
  );
}

export default App;
