import React, { useEffect, useState } from 'react';
import './About.css';
import CardModal from '../cards/card';
const About: React.FC = () => {
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState<number | null>(null);

    // About.tsx
    useEffect(() => {
      document.body.classList.add('about-body');
      return () => {
        document.body.classList.remove('about-body'); // ✅ Limpia al desmontar
      };
    }, []);
  const tarjetas = [
    {
      img: `${process.env.PUBLIC_URL}/img/Baby 1.png`,
      titulo: 'Paquete 1',
      descripcion: 'Descripción de la terapia A.',
      servicios: ['Terapia 1', 'Terapia 2', 'Evaluación inicial']
    },
    {
      img: `${process.env.PUBLIC_URL}/img/Bichito.png`,
      titulo: 'Paquete 2',
      descripcion: 'Descripción de la terapia B.',
      servicios: ['Terapia cognitiva', 'Terapia física']
    },
    {
      img: `${process.env.PUBLIC_URL}/img/Triqui.png`,
      titulo: 'Paquete 2',
      descripcion: 'Descripción de la terapia B.',
      servicios: ['Terapia cognitiva', 'Terapia física']
    },
    // Agrega más paquetes si quieres
  ];

  const cerrarModal = () => {
    setTarjetaSeleccionada(null);
  };

  return (
    <div className="container">
      <div className="uno">
        <div className="titulo1">
          <h1>Nombre Terapeuta</h1>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="imagen">
          <img src={`${process.env.PUBLIC_URL}/img/Rompecabeza2.png`} alt="Descripción de la imagen" />
        </div>
      </div>

      <div className="dos">
        <div className="sub1">
          <h2 className="subtitulo">Información sobre Paquetes</h2>
        </div>
          
        <div className="sub2">
        
          <div className="tarjetas-grid">
        
          <CardModal
            imgCard={`${process.env.PUBLIC_URL}/img/IMG_3393.jpg`}
            imgModal={`${process.env.PUBLIC_URL}/img/IMG_3393.jpg`}
            title="Terapia Infantil"
            description="Descripción personalizada para terapia infantil"
            tags={['Desarrollo', 'Motricidad', 'Aprendizaje']}
            modalContent={[
              'Contenido detallado sobre terapia infantil...',
              'Beneficios y metodologías aplicadas...',
              'Nuestro enfoque personalizado...'
            ]}
            buttonText="Agendar Terapia"
          />

          <CardModal
            imgCard={`${process.env.PUBLIC_URL}/img/IMG_3182.jpg`}
            imgModal={`${process.env.PUBLIC_URL}/img/IMG_3182.jpg`}
            title="Terapia Infantil"
            description="Descripción personalizada para terapia infantil"
            tags={['Desarrollo', 'Motricidad', 'Aprendizaje']}
            modalContent={[
              'Contenido detallado sobre terapia infantil...',
              'Beneficios y metodologías aplicadas...',
              'Nuestro enfoque personalizado...'
            ]}
            buttonText="Agendar Terapia"
          />

          <CardModal
            imgCard={`${process.env.PUBLIC_URL}/img/IMG_3529.jpg`}
            imgModal={`${process.env.PUBLIC_URL}/img/IMG_3529.jpg`}
            title="Terapia Infantil"
            description="Descripción personalizada para terapia infantil"
            tags={['Desarrollo', 'Motricidad', 'Aprendizaje']}
            modalContent={[
              'Contenido detallado sobre terapia infantil...',
              'Beneficios y metodologías aplicadas...',
              'Nuestro enfoque personalizado...'
            ]}
            buttonText="Agendar Terapia"
          />

          <CardModal
            imgCard={`${process.env.PUBLIC_URL}/img/IMG_3553.jpg`}
            imgModal={`${process.env.PUBLIC_URL}/img/IMG_3553.jpg`}
            title="Terapia Infantil"
            description="Descripción personalizada para terapia infantil"
            tags={['Desarrollo', 'Motricidad', 'Aprendizaje']}
            modalContent={[
              'Contenido detallado sobre terapia infantil...',
              'Beneficios y metodologías aplicadas...',
              'Nuestro enfoque personalizado...'
            ]}
            buttonText="Agendar Terapia"
          />

          <CardModal
            imgCard={`${process.env.PUBLIC_URL}/img/IMG_4303.jpg`}
            imgModal={`${process.env.PUBLIC_URL}/img/IMG_4303.jpg`}
            title="Terapia Infantil"
            description="Descripción personalizada para terapia infantil"
            tags={['Desarrollo', 'Motricidad', 'Aprendizaje']}
            modalContent={[
              'Contenido detallado sobre terapia infantil...',
              'Beneficios y metodologías aplicadas...',
              'Nuestro enfoque personalizado...'
            ]}
            buttonText="Agendar Terapia"
          />

          <CardModal
            imgCard={`${process.env.PUBLIC_URL}/img/IMG_4299.jpg`}
            imgModal={`${process.env.PUBLIC_URL}/img/IMG_4299.jpg`}
            title="Terapia Infantil"
            description="Descripción personalizada para terapia infantil"
            tags={['Desarrollo', 'Motricidad', 'Aprendizaje']}
            modalContent={[
              'Contenido detallado sobre terapia infantil...',
              'Beneficios y metodologías aplicadas...',
              'Nuestro enfoque personalizado...'
            ]}
            buttonText="Agendar Terapia"
          />

          </div>
        </div>
      </div>

      {/* ✅ MODAL flotante */}
      {tarjetaSeleccionada !== null && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={cerrarModal}>×</button>
            <img src={tarjetas[tarjetaSeleccionada].img} alt="" className="modal-img" />
            <h2>{tarjetas[tarjetaSeleccionada].titulo}</h2>
            <p>{tarjetas[tarjetaSeleccionada].descripcion}</p>
            <h4>Servicios incluidos:</h4>
            <ul>
              {tarjetas[tarjetaSeleccionada].servicios.map((servicio, i) => (
                <li key={i}>{servicio}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
