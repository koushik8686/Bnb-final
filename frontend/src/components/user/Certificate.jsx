'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
  },
  sideNav: {
    width: '200px',
    backgroundColor: '#1a237e',
    color: 'white',
    padding: '20px',
  },
  sideNavLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    color: '#1a237e',
    marginBottom: '10px',
  },
  certificatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  },
  cardTitle: {
    fontSize: '20px',
    color: '#1a237e',
    marginBottom: '10px',
  },
  cardContent: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  value: {
    marginLeft: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  downloadButton: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  viewButton: {
    backgroundColor: '#2196f3',
    color: 'white',
  },
  noCertificates: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#757575',
    marginTop: '50px',
  },
};

export default function DynamicCertificateGenerator() {
  const [certificates, setCertificates] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const user = Cookies.get('authToken');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/getcerts/${user}`);
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, [user]);

  const generateCertificate = (participant, index) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    canvas.width = 1000;
    canvas.height = 700;
  
    // Set background color based on position
    const positionColors = {
      1: '#FFD700', // Gold for 1st place
      2: '#C0C0C0', // Silver for 2nd place
      3: '#CD7F32', // Bronze for 3rd place
    };
    ctx.fillStyle = positionColors[participant.position] || '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 20;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  
    // Certificate title
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.font = 'bold 60px "Palatino"';
    ctx.fillText('Certificate of Achievement', canvas.width / 2, 120);
  
    // Subtitle
    ctx.font = 'italic 40px "Palatino"';
    ctx.fillText('This certifies that', canvas.width / 2, 220);
  
    // Participant's name
    ctx.font = 'bold 70px "Palatino"';
    ctx.fillText(participant.name, canvas.width / 2, 320);
  
    // Position and event
    ctx.font = 'italic 40px "Palatino"';
    ctx.fillText(`has achieved ${participant.position} place in`, canvas.width / 2, 400);
  
    ctx.font = 'bold 50px "Palatino"';
    ctx.fillText(participant.event, canvas.width / 2, 480);
  
    // Link
    ctx.font = '30px "Palatino"';
    ctx.fillText(`Link: http://localhost:4000/${user}/${index}`, canvas.width / 2, 540);
  
    // Signature
    ctx.font = 'italic bold 40px "Brush Script MT", cursive';
    ctx.textAlign = 'right';
    ctx.fillText('B.MONISH', canvas.width - 50, canvas.height - 50);
  
    return canvas.toDataURL();
  };
  

  const downloadCertificate = (participant , index) => {
    const certificateDataUrl = generateCertificate(participant , index);
    const link = document.createElement('a');
    link.download = `${participant.name}_${participant.event}_certificate.png`;
    link.href = certificateDataUrl;
    link.click();
  };

  return (
    <div style={styles.container}>
      <nav style={styles.sideNav}>
        <a href="/" style={styles.sideNavLink}>Home</a>
      </nav>
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>Your Certificates</h1>
        </header>
        {certificates.length > 0 ? (
          <div style={styles.certificatesGrid}>
            {certificates.map((certificate, index) => (
              <div
                key={certificate._id}
                style={{
                  ...styles.card,
                  ...(hoveredCard === certificate._id ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard(certificate._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h2 style={styles.cardTitle}>{certificate.event}</h2>
                <div style={styles.cardContent}>
                  <p><span style={styles.label}>Name:</span> <span style={styles.value}>{certificate.name}</span></p>
                  <p><span style={styles.label}>Position:</span> <span style={styles.value}>{certificate.position}</span></p>
                </div>
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => downloadCertificate(certificate , index)}
                    style={{...styles.button, ...styles.downloadButton}}
                  >
                    Download
                  </button>
                  <a
                    href={`http://localhost:3000/user/${user}/${index}`}
                    style={{...styles.button, ...styles.viewButton, textDecoration: 'none'}}
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noCertificates}>No certificates found.</p>
        )}
      </main>
    </div>
  );
}