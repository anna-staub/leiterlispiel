class Wuerfel{
  constructor(augenzahl) {
      this.Augenzahl = Number(augenzahl);
  }
  // Würfelergebnis für normalen Würfel berechnen
  wuerfeln() {
      let wuerfelergebnis = Math.ceil(Math.random()*this.Augenzahl);
      wuerfelergebnis = parseInt(wuerfelergebnis);
      if (debug_modus) {console.log('Würfelergebnis: '+wuerfelergebnis);}
      return wuerfelergebnis;
  };
  wuerfelergebnisAusgeben(zahl) {
      document.getElementById('wuerfelanzeige').innerHTML = String('Zuletzt gewürfelte Zahl: <br>\ '+zahl);
  }
  // Würfelergebnis für Spezialwürfel berechnen (ermöglich negative Würfelergebnisse)
  spezialWuerfeln(min, max) {
      let wuerfelergebnis = Math.round(Math.random() * (max - min) + min); 
      wuerfelergebnis = parseInt(wuerfelergebnis);
      if (debug_modus) {console.log('Spezialwürfelergebnis: '+wuerfelergebnis);}
      return wuerfelergebnis;
    }
}

// Würfel während des Spielzugs deaktivieren
function wuerfelSperren() {
  wuerfelbuttons.forEach((button) => {
    button.setAttribute('disabled', '')
  });
}
  
// Würfel nach dem Spielzug reaktivieren
function  wuerfelEntsperren() {
  setTimeout(() => {
    wuerfelbuttons.forEach((button) => {
      button.removeAttribute('disabled')
    });
  }, 500);
}