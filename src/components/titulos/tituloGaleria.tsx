import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './tituloGaleria.module.css';

const LoadingScreen: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '-50px 0px'
  });

  const firstWord = ['G', 'A', 'L', 'E', 'R', 'I', 'A'];
  const secondWord = ['D', 'E', 'N', 'A', 'L', 'I'];

  return (
    <div ref={ref} className={`${styles.startScreen} ${inView ? styles.active : ''}`}>
      <div className={styles.loading}>
        {firstWord.map((letter, index) => (
          <div 
            key={index}
            className={`${styles.loading__element} ${styles[`el${index + 1}`]}`}
          >
            {letter}
          </div>
        ))}
      </div>
      
      <div className={styles.loading}>
        {secondWord.map((letter, index) => (
          <div
            key={index}
            className={styles.loading__element}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;