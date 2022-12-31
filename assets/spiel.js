// Spielfeld erstellen
class Spiel {
    #spielfeld = new Spielfeld();
    spieler1 = new Spieler(Feld, 'spieler1');
    spieler2 = new Spieler(Feld, 'spieler2');

    aktuellesFeld = document.getElementById('feld0'); // anstatt feld0 eine Variable, welche die richtige Id holt

    constructor(spieler1, spieler2) {
      spieler1 = this.spieler1;
      spieler2 = this.spieler2;
      spieler1.AddToFeld(this.aktuellesFeld);
      spieler2.AddToFeld(this.aktuellesFeld);
    }

    // DOM-Element (aktueller Spieler)
    domElementAktuellerSpieler = document.getElementById('player');
    // aktueller Spieler
    AktuellerSpieler = 'spieler1';
  }
  
  new Spiel();