class Spieler {
  // Feldnummer initialisieren
  feldnummer = 0;
  // DOM-Element Spielfigur
  #domElementSpielfigur = document.createElement('div');
  // DOM-Element für Spieleranzeige
  domElementSpieleranzeige = document.createElement('div');
  // Feld
  #parentFeld;
  
  // Instanzieren der Klasse
  constructor(startfeld, spielername) {
    this.feldnummer = this.feldnummer;
    this.#parentFeld = startfeld;
    this.spielername = spielername;
    // Class-Attribut und ID-Attribut auf beide DOM-Elemente setzen
    this.#domElementSpielfigur.setAttribute('class', 'spieler');
    this.domElementSpieleranzeige.setAttribute('class', 'spieler');
    if (this.spielername === 'spieler1') {
      this.#domElementSpielfigur.setAttribute('id', 'spieler1');
      this.domElementSpieleranzeige.setAttribute('id', 'spieler1');
    } else if (this.spielername === 'spieler2') {
      this.#domElementSpielfigur.setAttribute('id', 'spieler2');
      this.domElementSpieleranzeige.setAttribute('id', 'spieler2');
    }
  }

  // DOM-Element Spielfigur dem Feld hinzufügen
  AddToFeld(feld) {
    feld.appendChild(this.#domElementSpielfigur);
  }
  // anhand der Feldnummer das Objekt im Array suchen und den Spieler ins entsprechende DOM-Element platzieren
  SetFeld(Feld) {
    this.feldnummer = Number(Feld.feldnummer);
    this.AddToFeld(Feld.domElement);
  }
  // Feldnummer ermitteln 
  GetFeldNummer() {
    return this.feldnummer;
  }
  // Spieler in Spieleranzeige anzeigen
  spielerAnzeigen(){
    console.log('Aktueller Spieler: '+this.domElementSpieleranzeige.id);
    document.getElementById('spieleranzeige').appendChild(this.domElementSpieleranzeige);
  }
  // Spieler aus Spieleranzeige entfernen
  spielerAusAnzeigeEntfernen() {
    document.getElementById('spieleranzeige').removeChild(this.domElementSpieleranzeige);
  }
}