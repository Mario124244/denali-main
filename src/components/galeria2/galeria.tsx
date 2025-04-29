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
    { details: 'jelly-o brownie sweet' },
    { details: 'Muffin jelly gingerbread', size: 'large' },
    { details: 'sesame snaps chocolate', size: 'medium' },
    { details: 'Oat cake', size: 'large' },
    { details: 'jujubes cheesecake', size: 'full' },
    { details: 'Dragée pudding brownie', size: 'medium' },
    { details: 'Oat cake', size: 'large' },
    { details: 'powder toffee' },
    { details: 'pudding cheesecake', size: 'medium' },
    { details: 'toffee bear claw', size: 'large' },
    { details: 'cake cookie croissant' },
    { details: 'liquorice sweet roll', size: 'medium' },
    { details: 'chocolate marzipan', size: 'medium' },
    { details: 'danish dessert lollipop', size: 'large' },
    { details: 'sugar plum dragée' }
  ];

  useEffect(() => {
    setGridSupported(CSS.supports('display', 'grid'));
  }, []);

  if (!gridSupported) {
    return (
      <div className={styles.message}>
        Sorry, your browser does not support CSS Grid. 😅
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <h1>Galeria DENALI</h1>
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