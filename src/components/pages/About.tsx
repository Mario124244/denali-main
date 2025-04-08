import React, { useEffect } from 'react';
import './About.css';

const About: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('about-body');
    return () => {
      document.body.classList.remove('about-body');
    };
  }, []);

  const tarjetas = [
    { img: `${process.env.PUBLIC_URL}/img/Baby 1.png`, titulo: 'Paquete 1', descripcion: 'Descripción de la terapia A.' },
    { img: `${process.env.PUBLIC_URL}/img/Bichito.png`, titulo: 'Paquete 2', descripcion: 'Descripción de la terapia B.' },
    { img: `${process.env.PUBLIC_URL}/img/Triqui.png`, titulo: 'Paquete 3', descripcion: 'Descripción de la terapia C.' },
    { img: `${process.env.PUBLIC_URL}/img/Woolis.png`, titulo: 'Paquete 4', descripcion: 'Descripción de la terapia D.' },
    { img: `${process.env.PUBLIC_URL}/img/Kantis.png`, titulo: 'Paquete 5', descripcion: 'Descripción de la terapia E.' },
    { img: `${process.env.PUBLIC_URL}/img/Rompecabeza.png`, titulo: 'Paquete 6', descripcion: 'Descripción de la terapia F.' },
    { img: `${process.env.PUBLIC_URL}/img/Triqui-Closed.png`, titulo: 'Paquete 7', descripcion: 'Descripción de la terapia G.' },
    { img: `${process.env.PUBLIC_URL}/img/Kantis-closed.png`, titulo: 'Paquete 8', descripcion: 'Descripción de la terapia H.' },
    { img: `${process.env.PUBLIC_URL}/img/Bichito-closed.png`, titulo: 'Paquete 9', descripcion: 'Descripción de la terapia I.' },
  ];
  

  return (
    <div className="container">
      <div className="uno">
        <div className="titulo1">
          <h1>Nombre Terapeuta</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita sed enim nihil magni, omnis reprehenderit! Neque cum sint explicabo modi atque, vero velit repellendus ab quae laborum. Voluptatum, eaque consectetur?</p>
        </div>
        <div className="imagen">
          <img src={`${process.env.PUBLIC_URL}/img/rompecabeza2.png`} alt="Descripción de la imagen" />
        </div>
      </div>

      <div className="dos">
        <div className="sub1">
          <h2 className="subtitulo">Informacion sobre Paquetes</h2>
        </div>

        <div className="sub2">
          <div className="tarjetas-grid">
            {tarjetas.map((tarjeta, index) => (
              <div key={index} className="tarjeta">
                <img src={tarjeta.img} alt={tarjeta.titulo} />
                <h3>{tarjeta.titulo}</h3>
                <p>{tarjeta.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
