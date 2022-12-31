class Spieler {
  // Startposition festlegen 
  #feld = 0;

  // DOM-Element
  #domElement = document.createElement('div');
  // Feld
  #parentFeld
  
  // Instanzieren der Klasse
  constructor(startfeld, spieler) {
    this.#parentFeld = startfeld;
    // Class-Attribut und ID-Attribut auf div-Element setzen
    this.#domElement.setAttribute('class', 'spieler');
    if (spieler === 'spieler1') {
      this.#domElement.setAttribute('id', 'spieler1');
    } else if (spieler === 'spieler2') {
      this.#domElement.setAttribute('id', 'spieler2');
    }
  }

  // DOM-Element (Spieler) dem Feld hinzufügen
  AddToFeld(feld) {
    feld.appendChild(this.#domElement);
  }

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
