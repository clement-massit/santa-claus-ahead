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

  return (
    <header>
      <div className="snow-container"></div>

      <h1>Secret Santa 🎅</h1>
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
            💰 <strong>Budget cadeau :</strong> 2 balles
          </p>
          <p>
            📅 <strong>Date limite :</strong> Demain
          </p>
        </div>
        <p className="outro">
          Soyez créatif, ou ne le soyez pas, de toute façon votre destinataire
          dira « Oh, c’est parfait ! Merciiiiii ! ». <br />
          Et pour ceux qui pensent offrir un cadeau marrant : n’oubliez pas que
          la vengeance se fait souvent au pot de départ. 🎄
        </p>
        <p className="footer">
          Allez, amusez-vous ! (ou faites semblant, ça marche aussi).
        </p>
      </div>
    </header>
  );
};

export default Header;
