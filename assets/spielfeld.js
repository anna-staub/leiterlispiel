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
      }
    }
  
    // Zug ausführen
    // Würfeln
    /*wuerfeln() {
      return Math.ceil(Math.random() *6) 
        }
        */
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