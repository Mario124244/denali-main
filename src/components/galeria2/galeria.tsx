import React, { useEffect, useState } from 'react';
import styles from './galeria.module.css';

interface GridItem {
  details: string;
  size?: 'medium' | 'large' | 'full';
}

const NomNomGallery: React.FC = () => {
  const [gridSupported, setGridSupported] = useState(true);
  const backgroundImages = [
    `${process.env.PUBLIC_URL}/img/c1.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_2208.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_2575.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_2856.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_2900.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3118.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3182.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3221.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3230.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3393.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3425.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3444.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3462.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3528.jpg`,
    `${process.env.PUBLIC_URL}/img/IMG_3529.jpg`
  ];


  const items: GridItem[] = [
    { details: 'Descripcion 1' },
    { details: 'Descripcion 2', size: 'large' },
    { details: 'descripcion 3', size: 'medium' },
    { details: 'descripcion 5', size: 'large' },
    { details: 'descripcion 6', size: 'full' },
    { details: 'descripcion 7', size: 'medium' },
    { details: 'descripcion 8', size: 'large' },
    { details: 'descripcion 9' },
    { details: 'descripcion 10', size: 'medium' },
    { details: 'descripcion 11', size: 'large' },
    { details: 'descripcion 12' },
    { details: 'descripcion 13', size: 'medium' },
    { details: 'descripcion 14', size: 'medium' },
    { details: 'descripcion 15', size: 'large' },
    { details: 'descripcion 16' }
  ];

  useEffect(() => {
    setGridSupported(CSS.supports('display', 'grid'));
  }, []);

  if (!gridSupported) {
    return (
      <div className={styles.message}>
        tu navegador no soporta css grid
      </div>
    );
  }

  return (
    <section className={styles.section}>
      
      <div className={styles.grid}>
        {items.map((item, index) => {
          const backgroundImage = `url(${backgroundImages[index]})`;
          
          return (
            <div
              key={index}
              className={`
                ${styles.item}
                ${item.size ? styles[`item--${item.size}`] : ''}
              `}
              style={{ backgroundImage }}
            >
              <div className={styles.item__details}>
                <span>{index + 1}.</span>
                {item.details}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NomNomGallery;