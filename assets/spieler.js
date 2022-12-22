class Spieler {
    #feld = 0;
  
    SetFeld(id) {
      this.#feld = id;
    }
  
    GetFeld() {
      return this.#feld;
    }

    // Spieler-Methode zugBeenden
    zugBeenden() {
      this.spielerWechseln();
      setTimeout(() => {
        this.checkWin();
      }, 100);
    }
  
    // Spieler-Methode Spieler wechseln
    spielerWechseln() {
      this.aktuellerSpieler = this.aktuellerSpieler === 'spieler1' ? 'spieler2' : 'spieler1';
      this.domElementAktuellerSpieler.className = this.aktuellerSpieler;
    }

  }
    
   
    // Zug ausführen
        // Würfeln

            /*
            funktioniert noch nicht aber generelle Idee:
              let wurf = document.getElementById('wuerfelbutton').addEventListener('click', SPIELWUERFEL.wuerfeln());
              console.log(wurf)
                */


        // aktuelles Feld ermitteln
            /*  aktuellen Spieler prüfen
                if (aktuellerSpieler = spieler1) {
                  let standort = spieler1.GetFeld();
                }
            */


        // Zielfeld ermitteln

              /* standort + wurf */

        // Spielfigur bewegen

                /* spieler1.SetFeld(standort+wurf); */



        // Feld auf Leiter prüfen
            // Leiter verwenden
            // Spielfigur bewegen
        // Spielstand prüfen
            // Sieg feststellen / mitteilen
            // Spiel beenden / zurücksetzen


        // Würfelergebnis auf 6 prüfen
                  // Würfeln


                  /* if (wurf = 6 ) {
                    aktuellerSpieler.wuerfeln();
                  }
                    */

            
            // ...
    // Zug beenden


              /*
          aktuellerSpieler.zugBeenden();
                    */

  //noch alle Bezeichnungen anpassen, dass sie deutsch geschrieben sind
