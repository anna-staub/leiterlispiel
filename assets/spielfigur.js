class Spielfigur {
  #spielfigurId = '';
  // Feldnummer der Spielfigur initialisieren
  #spielfigurFeldnummer = 0;
  // DOM-Element Spielfigur
  #domElementSpielfigur = document.createElement('div');
  
  // Instanzieren der Klasse
  constructor(spielfigurname, spielfigurId, spielfigurfarbe, spielername) {
    this.#spielfigurId = spielfigurId;
    this.#spielfigurFeldnummer = this.#spielfigurFeldnummer;
    this.spielfigurname = spielfigurname;
    this.spielfigurfarbe = spielfigurfarbe;
    this.spielername = spielername;

    // Class-Attribut und ID-Attribut auf DOM-Element setzen
    this.#domElementSpielfigur.setAttribute('class', 'spielfigur');
    if (this.spielfigurname === 'spielfigur1') {
      this.#domElementSpielfigur.setAttribute('id', 'spielfigur1');
      this.#domElementSpielfigur.setAttribute("style", "background-color:"+this.spielfigurfarbe)
    } else if (this.spielfigurname === 'spielfigur2') {
      this.#domElementSpielfigur.setAttribute('id', 'spielfigur2');
      this.#domElementSpielfigur.setAttribute("style", "background-color:"+this.spielfigurfarbe)
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