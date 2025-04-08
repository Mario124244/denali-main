import React, { useEffect } from 'react';
import SectionDivider from '../SectionDivider';
import './inicio.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// 👉 Arreglo de tarjetas del carrusel
const tarjetas = [
  { img: `${process.env.PUBLIC_URL}/img/c1.jpg` },
  { img: `${process.env.PUBLIC_URL}/img/IMG_2208.jpg`},
  { img: `${process.env.PUBLIC_URL}/img/IMG_2575.jpg` },
  { img: `${process.env.PUBLIC_URL}/img/IMG_2856.jpg` },
  { img: `${process.env.PUBLIC_URL}/img/IMG_2900.jpg`},
  { img: `${process.env.PUBLIC_URL}/img/IMG_3118.jpg` },
  { img: `${process.env.PUBLIC_URL}/img/IMG_3182.jpg` },
  { img: `${process.env.PUBLIC_URL}/img/Kantis-closed.png` },
  { img: `${process.env.PUBLIC_URL}/img/Bichito-closed.png` },
];

const Inicio: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('no-scroll', 'inicio-body');
    return () => {
      document.body.classList.remove('no-scroll', 'inicio-body');
    };
  }, []);

  return (
    <>
      <SectionDivider />
      
      <div className='container2'>
      <div className='parte2'>
          <h1>Inicio</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        <div className='carrousel1'>
        <Carousel 
            autoPlay 
            infiniteLoop 
            showThumbs={false} 
            showStatus={false} 
            showArrows={false} // 👈 esto quita las flechas
          >
          {tarjetas.map((tarjeta, index) => (
            <div key={index} className="carousel-slide">
              <img src={tarjeta.img} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Carousel>


        </div>

        

        <div className="side-button">
          {/* Botón lateral si lo necesitas */}
        </div>
      </div>
    </>
  );
};

export default Inicio;
