class Spielfigur {
  #spielfigurId = 0;
  // Feldnummer der Spielfigur initialisieren
  #spielfigurFeldnummer = 0;
  // DOM-Element Spielfigur
  #domElementSpielfigur = document.createElement('div');
  // Feld
  #parentFeld;
  
  // Instanzieren der Klasse
  constructor(startfeld, spielfigurname, spielfigurId) {
    this.spielfigurId = spielfigurId;
    this.#spielfigurFeldnummer = this.#spielfigurFeldnummer;
    this.#parentFeld = startfeld;
    this.spielfigurname = spielfigurname;
    // Class-Attribut und ID-Attribut auf DOM-Element setzen
    this.#domElementSpielfigur.setAttribute('class', 'spielfigur');
    if (this.spielfigurname === 'spielfigur1') {
      this.#domElementSpielfigur.setAttribute('id', 'spielfigur1');
    } else if (this.spielfigurname === 'spielfigur2') {
      this.#domElementSpielfigur.setAttribute('id', 'spielfigur2');
    }
  }

  // Feldnummer der Spielfigur ermitteln 
  getSpielfigurFeldNummer() {
    return this.#spielfigurFeldnummer;
  }
  // anhand der Feldnummer das Objekt im Array suchen und der Spielfigur als neue spielfigurFeldnummer zuweisen
  setFeld(Feld) {
    this.#spielfigurFeldnummer = Number(Feld.feldnummer);
  }
  // DOM-Element Spielfigur dem Feld hinzufügen
  addToFeld(Feld) {
    Feld.appendChild(this.#domElementSpielfigur);
  }
}