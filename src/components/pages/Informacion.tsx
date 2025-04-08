import React, { useEffect } from 'react';
import styles from './Informacion.module.css';

const Informacion: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('informacion-body');
    return () => {
      document.body.classList.remove('informacion-body');
    };
  }, []);

  return (
    <div className={styles.container2}>
      <div className={styles.area1}>
        <div className={styles.imagen}>
          <img src={`${process.env.PUBLIC_URL}/img/terapeuta12.png`} alt="Descripción de la imagen" />
        </div>
          <div className={styles.texto}>
            <h1>Informacio GeneraL</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos quae maxime voluptas optio, expedita id quas consequatur corrupti earum nemo voluptatem sint dolor nihil dicta veritatis, distinctio sapiente omnis?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat atque alias tenetur reiciendis nulla? Repellat, optio maxime! Odit soluta, autem mollitia eius quod doloribus. Vitae deleniti aliquam tempora consequatur voluptates.</p>
          </div>

      </div>
      <div className={styles.area2}>
        
        <div className={styles.texto}>
        <h1>NOMBRE DE TERAPEUTA</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos quae maxime voluptas optio, expedita id quas consequatur corrupti earum nemo voluptatem sint dolor nihil dicta veritatis, distinctio sapiente omnis?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat atque alias tenetur reiciendis nulla? Repellat, optio maxime! Odit soluta, autem mollitia eius quod doloribus. Vitae deleniti aliquam tempora consequatur voluptates.</p>
        </div>
        <div className={styles.imagen}>
          <img src={`${process.env.PUBLIC_URL}/img/terapeuta2.jpg`} alt="Terapeuta2" />
        </div>
      </div>
      <div className={styles.area3}>
        <div className={styles.imagen}>
          <img src={`${process.env.PUBLIC_URL}/img/terapeuta3.png`} alt="Terpeuta3" />
        </div>
        <div className={styles.texto}>
        <h1>NOMBRE DE TERAPEUTA</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos quae maxime voluptas optio, expedita id quas consequatur corrupti earum nemo voluptatem sint dolor nihil dicta veritatis, distinctio sapiente omnis?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat atque alias tenetur reiciendis nulla? Repellat, optio maxime! Odit soluta, autem mollitia eius quod doloribus. Vitae deleniti aliquam tempora consequatur voluptates.</p>
        </div>
      </div>
      
    </div>
  );
};

export default Informacion;
