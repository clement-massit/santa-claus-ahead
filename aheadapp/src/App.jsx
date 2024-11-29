import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ParticipantForm from "./components/ParticipantForm";
// import PairingLogic from "./components/PairingLogic";
import Background from "./components/Background";
import Pres from "./components/Presentation";
// import "./App.css";
import "./style.css";

function App() {
  const [participants, setParticipants] = useState([]);
  return (
    <>
      <Header />    
      
      <Pres></Pres>
   
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
