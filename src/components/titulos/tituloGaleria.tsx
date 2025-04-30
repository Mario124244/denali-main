import React from 'react';
import styles from './tituloGaleria.module.css';


const LoadingScreen: React.FC = () => {
  const firstWord = ['G', 'A', 'L', 'E', 'R', 'I', 'A'];
  const secondWord = ['D', 'E', 'N', 'A', 'L', 'I',];

  return (
    <div className={styles.startScreen}>
      <div className={styles.loading}>
        {firstWord.map((letter, index) => (
          <div 
            key={index}
            className={`${styles.loading__element} ${styles[`el${index + 1}`]}`}
            style={{ animationDelay: `${index * 0.2}s` }}
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
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {letter}
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;