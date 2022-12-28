class Spielfeld {
    // Array von Feldern
    #felderArray = [];
    // DOM-Element (Spielfeld)
    #domElement = document.getElementById('board');
    // Gewinnzustand
  
    // DOM-Element (aktueller Spieler)
    domElementAktuellerSpieler = document.getElementById('player');
    // aktueller Spieler
    AktuellerSpieler = 'spieler1';

  
    // Spielfeld-Instanz erstellen
    constructor() {
      for (let i = 99; i>-1; i--) {
        let j=i
        if (Math.floor(i/10) % 2 === 0) {
        j = Math.floor(i / 10) * 10 + (9 - i % 10);
        } 
        let feld = null;
        let konfig = SPIELFELD_LEITERKONFIG.find(konfig => konfig.id = j);
        let feldId;
        if (konfig) {
          feld = new Leiterfeld(this, j, konfig.zielfeld);
        } else {
          feld = new Feld(this, j);
        }
        this.#felderArray.push(feld);
        // DOM-Element (Felder) dem Spielfeld hinzufügen
        feld.AddToBoard(this.#domElement);
      }
    }

    // Spieler-Methode Spieler wechseln
    // ich bin mir nicht sicher, wo das genau hingehört.. passt das hier?
    spielerWechseln() {
      this.AktuellerSpieler = this.AktuellerSpieler === 'spieler1' ? 'spieler2' : 'spieler1';
      this.domElementAktuellerSpieler.className = this.AktuellerSpieler;
    }
  }
  