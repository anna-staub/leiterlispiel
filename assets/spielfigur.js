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
    this.#domElementSpielfigur.style.backgroundColor = this.spielfigurfarbe;
    this.#domElementSpielfigur.setAttribute('id', this.spielfigurname);
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

// ToDo: evtl. bessere Stelle für diese Funktionen finden
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
  // Wert von Variable pausiert auf false setzen, damit warten() beendet wird
  pausiert = false;
}