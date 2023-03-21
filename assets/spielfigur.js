class Spielfigur {
  #spielfigurId = '';
  // Feldnummer der Spielfigur initialisieren
  #spielfigurFeldnummer = 0;
  // DOM-Element Spielfigur
  #domElementSpielfigur = document.createElement('div');
  // Feld
  #elternFeld;
  
  // Instanzieren der Klasse
  constructor(startfeld, spielfigurname, spielfigurId) {
    this.#spielfigurId = spielfigurId;
    this.#spielfigurFeldnummer = this.#spielfigurFeldnummer;
    this.#elternFeld = startfeld;
    this.spielfigurname = spielfigurname; // ! spielfigurname durch userid ersetzen
    // ! Wenn die spielId bei der spielfigur mitgegeben wird, müsste man die spielId hier dann mitgeben/speichern?
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

  // ! Methode Spielfigur erstellen (POST spielfigur um Id zu erhalten) ?
 
}