class Wuerfel{
    constructor(augenzahl) {
        this.Augenzahl = Number(augenzahl);
    }
    // Würfel-Methode
    wuerfeln() {
        let wuerfelergebnis = Math.ceil(Math.random()*this.Augenzahl);
        wuerfelergebnis = parseInt(wuerfelergebnis);
        if (debug_mode) {console.log('Würfelergebnis: '+wuerfelergebnis);}
        return wuerfelergebnis;
    };
    wuerfelergebnisAusgeben(zahl) {
        document.getElementById('wuerfelanzeige').innerHTML = String('Zuletzt gewürfelte Zahl: <br>\ '+zahl);
    }
    // Spezial-Würfel-Methode
    spezialWuerfeln(min, max) {
        let wuerfelergebnis = Math.round(Math.random() * (max - min) + min); 
        wuerfelergebnis = parseInt(wuerfelergebnis);
        if (debug_mode) {console.log('Spezialwürfelergebnis: '+wuerfelergebnis);}
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
