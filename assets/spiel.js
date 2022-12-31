// Spielfeld erstellen
class Spiel {
    #spielfeld = new Spielfeld();
    spieler1 = new Spieler(Feld, 'spieler1');
    spieler2 = new Spieler(Feld, 'spieler2');

    // DOM-Element (aktueller Spieler)
    domElementAktuellerSpieler = document.getElementById('player');
    // aktueller Spieler
    AktuellerSpieler = 'spieler1';
  }
  
  new Spiel();
