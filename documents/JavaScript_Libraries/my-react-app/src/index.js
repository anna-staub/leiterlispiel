// React-Library importieren
import React from 'react';
// ReactDOM importieren
import ReactDOM from 'react-dom/client';
// CSS Stylesheet importieren
import './style.css';
// Komponente App importieren
import App from './App';

// React erstellt eine Wurzel und übernimmt die Verwaltung des DOMs darin
const root = ReactDOM.createRoot(document.getElementById('root'));
// Aufruf der Render-Methode von root um die React-Komponente 'App' im Browser-DOM-Knoten anzuzeigen
// initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);