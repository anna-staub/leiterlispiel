class Spieler {
    #feld = 0;
  
    SetFeld(id) {
      this.#feld = id;
    }
  
    GetFeld() {
      return this.#feld;
    }

    // Ergebnis prüfen
    gewinnPruefen() {
      if (this.#feld >= 99) {
        // Gewinner verkünden
        alert(`${this.AktuellerSpieler} hat gewonnen!`)
        // Spiel beenden
      }
    }

    // Spieler-Methode zugBeenden
    zugBeenden() {
      this.spielerWechseln();
      setTimeout(() => {
        this.gewinnPruefen();
      }, 100);
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
                if (AktuellerSpieler = spieler1) {
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
                    AktuellerSpieler.wuerfeln();
                  }
                    */

            
            // ...
    // Zug beenden


              /*
          AktuellerSpieler.zugBeenden();
                    */

  //noch alle Bezeichnungen anpassen, dass sie deutsch geschrieben sind
