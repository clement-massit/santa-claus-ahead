// import "./App.css";
import "./style.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SecretSanta from "./components/SecreSanta/SecretSanta";
import HomeAhead from "./components/Home";
import Repas from "./components/Repas/Repas";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <Router>
        <div>
          <NavBar></NavBar>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<HomeAhead />}></Route>
            <Route path="/secretsanta" element={<SecretSanta />}></Route>
            <Route path="/repas" element={<Repas />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
