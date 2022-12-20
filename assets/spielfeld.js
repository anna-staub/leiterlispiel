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
  
    // Zug ausführen
    // Würfeln
    
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