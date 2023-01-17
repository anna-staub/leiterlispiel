class Spieler {
  // Feldnummer des Spielers initialisieren
  #spielerFeldnummer = 0;
  // DOM-Element Spielfigur
  #domElementSpielfigur = document.createElement('div');
  // Feld
  #parentFeld;
  
  // Instanzieren der Klasse
  constructor(startfeld, spielername) {
    this.#spielerFeldnummer = this.#spielerFeldnummer;
    this.#parentFeld = startfeld;
    this.spielername = spielername;
    // Class-Attribut und ID-Attribut auf DOM-Element setzen
    this.#domElementSpielfigur.setAttribute('class', 'spieler');
    if (this.spielername === 'spieler1') {
      this.#domElementSpielfigur.setAttribute('id', 'spieler1');
    } else if (this.spielername === 'spieler2') {
      this.#domElementSpielfigur.setAttribute('id', 'spieler2');
    }
  }

  // DOM-Element Spielfigur dem Feld hinzufügen
  addToFeld(feld) {
    feld.appendChild(this.#domElementSpielfigur);
  }
  // anhand der Feldnummer das Objekt im Array suchen und den Spieler ins entsprechende DOM-Element platzieren
  // AddToFeld wieder rausnehmen und beide Methoden einzeln aufrufen im spiel.js
  setFeld(Feld) {
    this.#spielerFeldnummer = Number(Feld.feldnummer);
    this.addToFeld(Feld.domElement);
  }
  // Feldnummer des Spielers ermitteln 
  getSpielerFeldNummer() {
    return this.#spielerFeldnummer;
  }
}