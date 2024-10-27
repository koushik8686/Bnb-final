import React, { useState } from 'react';
import { AddTeam } from './AddTeam';
import { AddGame } from './AddGame';
import { Games } from './Game';

export default function Component() {
  const [activeSection, setActiveSection] = useState('Add Team');

  const navItems = ['Add Team', 'Add a Game', 'Games', 'Advertisement Statistics'];

  const gradients = {
    'Add Team': 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'Add a Game': 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'Games': 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    'Chat': 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'Advertisement Statistics': 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100vw',
      minHeight: '100vh',
      background: '#f0f0f0',
      overflow: 'hidden',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '1rem',
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    navItem: {
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
    },
    activeNavItem: {
      background: gradients[activeSection],
      color: '#fff',
      transform: 'scale(1.1)',
    },
    content: {
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 80px)',
      background: gradients[activeSection],
      transition: 'background 0.5s ease',
    },
    contentText: {
      fontSize: '2rem',
      color: '#fff',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease',
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Add Team':
        return <AddTeam />;
      case 'Add a Game':
        return <AddGame />;
      case 'Games':
        return <Games />;
      case 'Advertisement Statistics':
        window.location.href = '/admin/graph';
        return null;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <div
            key={item}
            style={{
              ...styles.navItem,
              ...(activeSection === item ? styles.activeNavItem : {}),
            }}
            onClick={() => setActiveSection(item)}
          >
            {item}
          </div>
        ))}
      </nav>
      <main style={styles.content}>
        <div style={styles.contentText}>{renderContent()}</div>
      </main>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
