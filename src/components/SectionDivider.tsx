import React, { useState } from "react";
import "./SectionDivider.css";
import BlinkingCharacter from "./parpade";

const SectionDivider = () => {
  const [hoveredAge, setHoveredAge] = useState<string | null>(null);
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="section-container">
      <div
          className="section age0"
          onMouseEnter={() => setHoveredAge("age0")}
          onMouseLeave={() => setHoveredAge(null)}
        >
          <p className="age">
            GRUPO <br /> <span className="subtitulo1">Woolis</span>
          </p>

          <BlinkingCharacter
            openImg={`${process.env.PUBLIC_URL}/img/Woolis.png`}
            closedImg={`${process.env.PUBLIC_URL}/img/Woolis-closed.png`}
            alt="Bebé"
            isHovered={hoveredAge === "age0"}
          />

          {hoveredAge === "age0" && (
            <div className="hover-text">45 dias hasta sentado maduro</div>
          )}
        </div>


        <div
          className="section age1"
          onMouseEnter={() => setHoveredAge("age1")}
          onMouseLeave={() => setHoveredAge(null)}
        >
          <p className="age">
            GRUPO <br /> <span className="subtitulo1">Aulex</span>
          </p>

          <BlinkingCharacter
            openImg={`${process.env.PUBLIC_URL}/img/Aulex.png`}
            closedImg={`${process.env.PUBLIC_URL}/img/Aulex-closed.png`}
            alt="Bebé"
            isHovered={hoveredAge === "age1"}
          />

          {hoveredAge === "age1" && (
            <div className="hover-text">Sentado hasta el gateo</div>
          )}
        </div>

        <div
          className="section age2"
          onMouseEnter={() => setHoveredAge("age2")}
          onMouseLeave={() => setHoveredAge(null)}
        >
          <p className="age">
            GRUPO <br /> <span className="subtitulo1">Kantis</span>
          </p>

          <BlinkingCharacter
            openImg={`${process.env.PUBLIC_URL}/img/Kantis.png`}
            closedImg={`${process.env.PUBLIC_URL}/img/Kantis-closed.png`}
            alt="Bebé"
            isHovered={hoveredAge === "age2"}
          />

          {hoveredAge === "age2" && (
            <div className="hover-text">Gateo hasta marcha independienbte</div>
          )}
        </div>
        <div
          className="section age3"
          onMouseEnter={() => setHoveredAge("age3")}
          onMouseLeave={() => setHoveredAge(null)}
        >
          <p className="age">
            GRUPO <br /> <span className="subtitulo1">Triqui</span>
          </p>

          <BlinkingCharacter
            openImg={`${process.env.PUBLIC_URL}/img/Triqui.png`}
            closedImg={`${process.env.PUBLIC_URL}/img/Triqui-Closed.png`}
            alt="Bebé"
            isHovered={hoveredAge === "age3"}
          />

          {hoveredAge === "age3" && (
            <div className="hover-text">Marcha independiente hasta los 2 años</div>
          )}
        </div>
    </div>
  );
};

export default SectionDivider;
