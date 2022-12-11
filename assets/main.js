class Spieler {
  #feld = 0;

  SetFeld(id) {
    this.#feld = id;
  }

  GetFeld() {
    return this.#feld;
  }

}

class Feld {
  // Markierung (Spieler-Repräsentation)
    // nicht so umsetzen, dass das Feld "weiss", welcher Spieler darauf steht, sondern dass der Spieler weiss auf welchem Feld er steht
  // Feld-ID setzen für die Unterscheidung und Referenzierung der einzelnen Felder
  #id = '';
  #feldtext = '';
  // DOM-Element
  #domElement = document.createElement('div');
  //Spielfeld
  #parentSpielfeld;

  // Instanzieren der Klasse
  constructor(spielfeld, id) {
    this.#parentSpielfeld = spielfeld;
    this.#id = 'feld'+id;
    this.#feldtext = id;
    // ID-Attribut auf div-Element setzen
    this.#domElement.setAttribute('id', this.#id);
    if (id != 0 && id != 99) {
      this.#domElement.textContent = this.#feldtext;
    }
    else if (id === 0) {
      this.#domElement.textContent = 'Start';
    }
    else if (id === 99) {
      this.#domElement.textContent = 'Ziel';
    }
  }

  AddToBoard(board) {
    board.appendChild(this.#domElement);
  }

  // Feld auf Leiter prüfen
      // Leiter verwenden
}

class Leiterfeld extends Feld {
  #zielfeld = '';

  constructor(spielfeld, id, zielfeld) {
    super(spielfeld, id);
    this.#zielfeld = zielfeld;
  }
}

// Mapping der Felder (von welchem Feld führt eine Leiter zu welchem Feld)
const SPIELFELD_LEITERKONFIG = [
  {id: 5, zielfeld: 14},
  {id: 16, zielfeld: 36},
  {id: 22, zielfeld: 2},
  {id: 32, zielfeld: 12},
  {id: 34, zielfeld: 54},
  {id: 52, zielfeld: 87},
  {id: 59, zielfeld: 40},
  {id: 62, zielfeld: 82},
  {id: 90, zielfeld: 50},
  {id: 94, zielfeld: 74}
];

class Spielfeld {
  // Array von Feldern
  #felderArray = [];
  // DOM-Element (Spielfeld)
  #domElement = document.getElementById('board');
  // Gewinnzustand

  // DOM-Element (aktueller Spieler)
  #domElementAktuellerSpieler = document.getElementById('player');
  // aktueller Spieler
  CurrentPlayer = 'spieler1';

  // Spielfeld-Instanz erstellen
  constructor() {
    let zehnerschritte = 0;
    for (let i = 99; i>-1; i--) {
      let feld = null;
      let konfig = SPIELFELD_LEITERKONFIG.find(konfig => konfig.id = i);
      let feldId;
      if (konfig) {
        feld = new Leiterfeld(this, i, konfig.zielfeld);
      } else {
        feld = new Feld(this, i);
      }
      this.#felderArray.push(feld);
      // DOM-Element (Felder) dem Spielfeld hinzufügen
      feld.AddToBoard(this.#domElement);
      zehnerschritte++;
    }
  }

  // Zug ausführen
  // Würfeln
  /*  wuerfeln() {
        return Math.ceil(Math.random() *6) 
      } */
      
    //evtl noch anpassen 
      // erneut Würfeln
      // wenn 6 ausgegeben wird 
  // Spielfigur bewegen
  // Zug beenden
  zugBeenden() {
    this.changePlayer();
    setTimeout(() => {
      this.checkWin();
    }, 100);
  }

  // Spieler wechseln
  changePlayer() {
    this.CurrentPlayer = this.CurrentPlayer === 'spieler1' ? 'spieler2' : 'spieler1';
    this.#domElementAktuellerSpieler.className = this.CurrentPlayer;
  }

  // Spielstand prüfen
    //Sieg feststellen / mitteilen

  // Spiel beenden / zurücksetzen

}

// Spielfeld erstellen
class Spiel {
  #spielfeld = new Spielfeld();
  #spieler1 = new Spieler();
  #spieler2 = new Spieler();
}

new Spiel();