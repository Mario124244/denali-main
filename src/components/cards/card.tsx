import { useState, useEffect, useCallback } from 'react';
import './card.css'; // Archivo CSS separado con los estilos proporcionados

interface CardModalProps {
    imgCard: string;
    imgModal: string;
    title: string;
    description: string;
    badgeText?: string;
    tags: string[];
    modalContent: string[];
    buttonText: 'Agendar Servicio' | 'Agendar Grupo' | string;
    customUrl?: string; // Opcional para sobreescribir URL
  }
const getButtonType = (text: string) => {
    if(text === 'Agendar Servicio') return 'service';
    if(text === 'Agendar Grupo') return 'group';
    return 'service'; // Valor por defecto
};
const CardModal = ({
    imgCard,
    imgModal,
    title,
    description,
    badgeText = 'FEATURED',
    tags,
    modalContent,
    buttonText,
    customUrl
  }: CardModalProps) => {
    const buttonType = getButtonType(buttonText);
    
    const getButtonUrl = () => {
        if(customUrl) return customUrl;
        return buttonType === 'service' 
            ? '/agendar-servicio' 
            : '/agendar-grupo';
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(false);

  const openModal = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Animación inicial de la tarjeta
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCardVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Event listener para tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  return (
    <div className="container">
      <div 
        className={`card card-photo ${isCardVisible ? 'fade-slide-up' : ''}`}
        onClick={(e) => !e.defaultPrevented && openModal()}
      >
        {badgeText && <div className="card-badge">{badgeText}</div>}
        <img 
          src={`${process.env.PUBLIC_URL}${imgCard}`}
          alt={title} 
        />
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <a 
            href="#" 
            className="read-more" 
            onClick={openModal}
            onMouseEnter={(e) => e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'}
          >
            Leer mas
          </a>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <img 
              src={`${process.env.PUBLIC_URL}${imgModal}`}
              alt={title} 
            />
            <div className="modal-close" onClick={closeModal} />
          </div>
          
          <div className="modal-content">
            <h1 className="modal-title">{title}</h1>
            <h3 className="modal-subtitle">{description}</h3>
            <div className="tag-list">
              {tags.map((tag, index) => (
                <span 
                  key={tag}
                  className="tag"
                  style={{
                    transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`,
                    opacity: isModalOpen ? 1 : 0,
                    transform: isModalOpen ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="modal-text">
              {modalContent.map((text, index) => (
                <p 
                  key={index}
                  style={{
                    transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.4 + index * 0.1}s`,
                    opacity: isModalOpen ? 1 : 0,
                    transform: isModalOpen ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <a 
                href={getButtonUrl()}
                className={`btn ${buttonType === 'service' ? 'btn-primary' : 'btn-primary'}`}
                style={{
                    transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.7s`,
                    opacity: isModalOpen ? 1 : 0,
                    transform: isModalOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
            >
                {buttonText}
            </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;