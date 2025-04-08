// Particulas.tsx
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particulas = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // ✅ no ocupa toda la ventana
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: {
            value: 20,
          },
          shape: {
            type: "image",
            image: {
              src: "/img/estrella.png", // 🔁 reemplaza con tu imagen
              width: 32,
              height: 32,
            },
          },
          size: {
            value: 20,
          },
          move: {
            enable: true,
            speed: 1.5,
            outModes: {
              default: "bounce",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // 🔁 reacción al mouse
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
      }}
    />
  );
};

export default Particulas;
