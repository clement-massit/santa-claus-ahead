import { useNavigate } from "react-router-dom"; // Utilisé pour la navigation
import "./Header.css";

const Header = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
      const size = Math.random() * 5 + 1;
      const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
      const viewportHeight = window.innerHeight;

      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
      snowflake.style.top = `-${size}px`;

      const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
      snowflake.style.animationDuration = `${animationDuration}s`;
      snowflake.style.animationTimingFunction = "linear";
      snowflake.style.animationName =
        Math.random() < 0.5 ? "fall" : "diagonal-fall";

      setTimeout(() => {
        if (parseInt(snowflake.style.top, 10) < viewportHeight) {
          resetSnowflake(snowflake);
        } else {
          snowflake.remove(); // Remove when it goes off the bottom edge
        }
      }, animationDuration * 1000);
    }

    function createSnowflake() {
      if (snowflakes.length < maxSnowflakes) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflakes.push(snowflake);
        snowContainer.appendChild(snowflake);
        resetSnowflake(snowflake);
      }
    }

    function generateSnowflakes() {
      const numberOfParticles =
        Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
        particlesPerThousandPixels;
      const interval = 5000 / numberOfParticles;

      clearInterval(snowflakeInterval);
      snowflakeInterval = setInterval(() => {
        if (isTabActive && snowflakes.length < maxSnowflakes) {
          requestAnimationFrame(createSnowflake);
        }
      }, interval);
    }

    function handleVisibilityChange() {
      if (!pauseWhenNotActive) return;

      isTabActive = !document.hidden;
      if (isTabActive) {
        generateSnowflakes();
      } else {
        clearInterval(snowflakeInterval);
      }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
      clearInterval(snowflakeInterval);
      setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
  });

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); // Redirige vers la page d'accueil
  };

  return (
    <header>
      {/* <nav>
        <button className="HomeButton" onClick={goToHome}>
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Accueil</span>
        </button>
      </nav> */}
      <div className="snow-container"></div>

      <h1 style={{ marginTop: "80px" }}> Secret Santa 🎅</h1>
      <div className="secret-santa-message">
        <p className="intro">
          Le moment de l’année où l’on découvre qui sait vraiment faire semblant
          d’aimer un mug.
        </p>
        <ol>
          <li>Tu tires un nom.</li>
          <li>T'offres un cadeau. Faites les radins.</li>
          <li>Tu souris quand tu reçois le tien. Même si c’est de la merde.</li>
        </ol>
        <div className="rules">
          <p>
            💰 <strong>Budget cadeau :</strong> illimité chakal
          </p>
          <p>
            📅 <strong>Date limite :</strong> 19 Décembre
          </p>
        </div>
        <p className="outro">
          Soyez créatif, ou ne le soyez pas, de toute façon votre destinataire
          dira « Oh, c’est parfait ! Merciiiiii ! ». <br />
          Et pour ceux qui pensent offrir un cadeau marrant : n’oubliez pas que
          la vengeance se fait souvent au pot de départ. 🎄
        </p>
        <p className="footer">
          On s'offrira les Kdo pendant l'oberje panaméenne le 19 décembre
        </p>
      </div>
    </header>
  );
};

export default Header;
