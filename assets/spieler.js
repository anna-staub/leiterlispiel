class Spieler {
    #feld = 0;
  
    SetFeld(id) {
      this.#feld = id;
    }
  
    GetFeld() {
      return this.#feld;
    }
    

    //Startspieler setzen
    // aktuelles Feld ermitteln
    // Zug ausführen
        // Würfeln
        // Zielfeld ermitteln
        // Spielfigur bewegen
        // Feld auf Leiter prüfen
            // Leiter verwenden
            // Spielfigur bewegen
        // Spielstand prüfen
            // Sieg feststellen / mitteilen
            // Spiel beenden / zurücksetzen
        // Würfelergebnis auf 6 prüfen
            // Würfeln
            // ...



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
  }

  //noch alle Bezeichnungen anpassen, dass sie deutsch geschrieben sind


  