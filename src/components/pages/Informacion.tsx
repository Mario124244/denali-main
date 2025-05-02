import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NomNomGallery from '../galeria2/galeria';
import styles from './Informacion.module.css';
import LoadingScreen from '../titulos/tituloGaleria';
import CloudSeparator from '../separadores/separadorUno';

// Componente para títulos animados
const AnimatedTitle = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  

  return (
    <h1 
      ref={ref}
      className={styles.animatedTitle}
      style={{
        animation: inView ? 'slideInTitle 1s ease-out forwards' : 'none',
        opacity: inView ? 1 : 0
      }}
    >
      {children}
    </h1>
  );
};

const Informacion: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('informacion-body');
    return () => {
      document.body.classList.remove('informacion-body');
    };
  }, []);
  const [loadingRef, loadingInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px 0px'
  });

  return (
    <div className={styles.container2}>
      <div className={styles.area1}>
        <div className={styles.imagen}>
          <img
            src={`${process.env.PUBLIC_URL}/img/terapeuta12.png`}
            alt="Descripción de la imagen"
          />
        </div>
        <div className={styles.texto}>
          <AnimatedTitle>Información General</AnimatedTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos quae
            maxime voluptas optio, expedita id quas consequatur corrupti earum nemo
            voluptatem sint dolor nihil dicta veritatis, distinctio sapiente omnis?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat atque alias
            tenetur reiciendis nulla? Repellat, optio maxime! Odit soluta, autem mollitia
            eius quod doloribus. Vitae deleniti aliquam tempora consequatur voluptates.
          </p>
        </div>
      </div>
      
      <div className={styles.area8}>
        <CloudSeparator color='#F3A2B5'/>
      </div>

      <div className={styles.area2}>
        <div className={styles.texto}>
          <AnimatedTitle>Nombre de Terapeuta</AnimatedTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos quae
            maxime voluptas optio, expedita id quas consequatur corrupti earum nemo
            voluptatem sint dolor nihil dicta veritatis, distinctio sapiente omnis?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat atque alias
            tenetur reiciendis nulla? Repellat, optio maxime! Odit soluta, autem mollitia
            eius quod doloribus. Vitae deleniti aliquam tempora consequatur voluptates.
          </p>
        </div>
        <div className={styles.imagen}>
          <img
            src={`${process.env.PUBLIC_URL}/img/terapeuta2.jpg`}
            alt="Terapeuta2"
          />
        </div>
      </div>

      <div className={styles.area7}>
        <CloudSeparator color='#FDE262'/>
      </div>

      <div className={styles.area3}>
        <div className={styles.imagen}>
          <div className={styles.marcoDecorativo}>
            <img
              src={`${process.env.PUBLIC_URL}/img/terapeuta3.jpg`}
              alt="Terapeuta3"
            />
          </div>
        </div>
        <div className={styles.texto}>
          <AnimatedTitle>Nombre de Terapeuta</AnimatedTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos quae
            maxime voluptas optio, expedita id quas consequatur corrupti earum nemo
            voluptatem sint dolor nihil dicta veritatis, distinctio sapiente omnis?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat atque alias
            tenetur reiciendis nulla? Repellat, optio maxime! Odit soluta, autem mollitia
            eius quod doloribus. Vitae deleniti aliquam tempora consequatur voluptates.
          </p>
        </div>
      </div>

      <div className={styles.area6}>
        <CloudSeparator/>
      </div>

      <div ref={loadingRef} className={styles.area4}>
        <div className={styles.subArea4}>
          {loadingInView &&<LoadingScreen />}
        </div>
      
        <NomNomGallery />
      </div>
    </div>
  );
};

export default Informacion;