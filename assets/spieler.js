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

  // Feldnummer des Spielers ermitteln 
  getSpielerFeldNummer() {
    return this.#spielerFeldnummer;
  }
  // anhand der Feldnummer das Objekt im Array suchen und dem Spieler als neue spielerFeldnummer zuweisen
  setFeld(Feld) {
    this.#spielerFeldnummer = Number(Feld.feldnummer);
  }
  // DOM-Element Spielfigur dem Feld hinzufügen
  addToFeld(Feld) {
    Feld.appendChild(this.#domElementSpielfigur);
  }
}