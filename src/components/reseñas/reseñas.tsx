import { useState, useEffect } from 'react';
import estilos from "./reseñas.module.css"
interface Review {
  id: number;
  Descripcion: string;
  Calificacion: number;
}

interface ReviewsComponentProps {
  reviews: Review[];
  isAuthenticated: boolean;
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ reviews, isAuthenticated }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  // Efecto para el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío aquí
  };

  return (
    <div className="reviews-container">
      <div className="reviews-carousel">
        <div className="carousel-inner">
          {reviews.map((review, i) => (
            <div 
              key={review.id}
              className={`carousel-item ${i === activeIndex ? 'active' : ''}`}
            >
              <div className="review-card">
                <img src="/img/resenas.png" alt="Reseñas" className="review-image" />
                <p className="review-text">{review.Descripcion}</p>
                <div className="rating-stars">
                  {[5, 4, 3, 2, 1].map((j) => (
                    <label key={j} className={`star ${j <= review.Calificacion ? 'filled' : ''}`}>
                      <input 
                        type="radio" 
                        name={`rating-${review.id}`} 
                        value={j}
                        readOnly
                        checked={j === review.Calificacion}
                      />
                      ★
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-control prev" onClick={handlePrev}>
          ‹
        </button>
        <button className="carousel-control next" onClick={handleNext}>
          ›
        </button>
      </div>

      {isAuthenticated && (
        <div className="review-form-container">
          <form onSubmit={handleSubmit} className="review-form">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Escribe tu reseña aquí..."
              className="review-textarea"
            />
            <div className="rating-input">
              {[5, 4, 3, 2, 1].map((j) => (
                <label key={j} className={`star ${j <= rating ? 'filled' : ''}`}>
                  <input
                    type="radio"
                    name="calificacion"
                    value={j}
                    onChange={() => setRating(j)}
                  />
                  ★
                </label>
              ))}
            </div>
            <button type="submit" className="submit-button">
              Enviar Reseña
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewsComponent;