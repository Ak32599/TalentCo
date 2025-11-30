// src/pages/LearningResources.jsx
import React from 'react';
import './LearningResources.css';

const resources = [
  {
    id: 'w3',
    title: 'W3Schools',
    description: 'Best site to learn HTML, CSS, JS with examples.',
    img: 'https://www.w3schools.com/images/w3schools_logo_436_2.png',
    url: 'https://www.w3schools.com'
  },
  {
    id: 'gfg',
    title: 'GeeksForGeeks',
    description: 'DSA, programming languages & interview prep.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg',
    url: 'https://www.geeksforgeeks.org'
  },
  {
    id: 'so',
    title: 'StackOverflow',
    description: 'Find answers to coding questions instantly.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg',
    url: 'https://stackoverflow.com'
  },
  {
    id: 'fcc',
    title: 'FreeCodeCamp',
    description: 'Free coding courses with certificates.',
    img: 'https://design-style-guide.freecodecamp.org/downloads/fcc_primary_small.svg',
    url: 'https://www.freecodecamp.org'
  },
  {
    id: 'coursera',
    title: 'Coursera',
    description: 'Learn from top universities and companies.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Coursera_logo.png',
    url: 'https://www.coursera.org'
  },
];

const LearningResources = () => {
  return (
    <div className="learning-page">
      <header className="learning-header">Learning Resources Hub</header>

      <div className="learning-container">
        {resources.map(r => (
          <div key={r.id} className="learning-card">
            <img src={r.img} alt={r.title} className="learning-img" />
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <a href={r.url} target="_blank" rel="noreferrer" className="visit-link">Visit Site</a>
          </div>
        ))}
      </div>

      <footer className="learning-footer">© {new Date().getFullYear()} Learning Hub — All rights reserved.</footer>
    </div>
  );
};

export default LearningResources;
