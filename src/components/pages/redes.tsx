
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { CSSProperties } from 'react';
import React, { useEffect } from 'react';
import './ContactSection.css';


const ContactSection = (): React.JSX.Element => { // Cambia JSX.Element por React.JSX.Element
  // ... resto del componente
  useEffect(() => {
      document.body.classList.add('redes-body');
      return () => {
        document.body.classList.remove('redes-body');
      };
    }, []);
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contáctanos</h2>
      
      <div style={styles.content}>
        <div style={styles.contactMethods}>
          <div style={styles.contactCard}>
            <FaPhone style={styles.icon} />
            <h3 style={styles.subtitle}>Teléfono</h3>
            <p style={styles.text}>+1 234 567 890</p>
          </div>
          
          <div style={styles.contactCard}>
            <FaEnvelope style={styles.icon} />
            <h3 style={styles.subtitle}>Email</h3>
            <p style={styles.text}>contacto@midominio.com</p>
          </div>
          
          <div style={styles.contactCard}>
            <FaMapMarkerAlt style={styles.icon} />
            <h3 style={styles.subtitle}>Dirección</h3>
            <p style={styles.text}>Ciudad, País</p>
          </div>
        </div>

        <div style={styles.socialSection}>
          <h3 style={styles.socialTitle}>Síguenos en redes</h3>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}>
              <FaFacebook style={styles.socialIcon} />
            </a>
            <a href="#" style={styles.socialLink}>
              <FaInstagram style={styles.socialIcon} />
            </a>
            <a href="#" style={styles.socialLink}>
              <FaTwitter style={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Definición de tipos para los estilos
interface Styles {
  [key: string]: CSSProperties;
}

const styles: Styles = {

  container: {
    backgroundColor: '#b1c5ed',
    padding: '4rem 2rem',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#795fbe',
    fontSize: '2.5rem',
    marginBottom: '3rem',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  contactMethods: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  },
  contactCard: {
    backgroundColor: '#99dacd',
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  icon: {
    fontSize: '2.5rem',
    color: '#795fbe',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#795fbe',
    margin: '1rem 0',
  },
  text: {
    color: '#795fbe',
    fontSize: '1.1rem',
  },
  socialSection: {
    backgroundColor: '#f8e56f',
    padding: '3rem',
    borderRadius: '20px',
    textAlign: 'center',
  },
  socialTitle: {
    color: '#795fbe',
    marginBottom: '2rem',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
  },
  socialLink: {
    color: '#f5a0b5',
    transition: 'color 0.3s ease',
  },
  socialIcon: {
    fontSize: '3rem',
  },


  
};

export default ContactSection;