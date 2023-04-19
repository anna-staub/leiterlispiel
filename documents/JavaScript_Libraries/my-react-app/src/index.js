import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';

// React erstellt eine Wurzel und übernimmt die Verwaltung des DOMs darin
const root = ReactDOM.createRoot(document.getElementById('root'));
// Aufruf von root.render, um die React-Komponente 'App' im Browser-DOM-Knoten anzuzeigen
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);