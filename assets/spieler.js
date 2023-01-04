class Spieler {
  // Feldnummer initialisieren
  feldnummer = 0;
  // DOM-Element Spielfigur
  #domElementSpielfigur = document.createElement('div');
  // DOM-Element für Spieleranzeige
  domElementSpieleranzeige = document.createElement('div');
  // Feld
  #parentFeld;
  
  // Instanzieren der Klasse
  constructor(startfeld, spielername) {
    this.feldnummer = this.feldnummer;
    this.#parentFeld = startfeld;
    this.spielername = spielername;
    // Class-Attribut und ID-Attribut auf beide DOM-Elemente setzen
    this.#domElementSpielfigur.setAttribute('class', 'spieler');
    this.domElementSpieleranzeige.setAttribute('class', 'spieler');
    if (this.spielername === 'spieler1') {
      this.#domElementSpielfigur.setAttribute('id', 'spieler1');
      this.domElementSpieleranzeige.setAttribute('id', 'spieler1');
    } else if (this.spielername === 'spieler2') {
      this.#domElementSpielfigur.setAttribute('id', 'spieler2');
      this.domElementSpieleranzeige.setAttribute('id', 'spieler2');
    }
  }

  // DOM-Element Spielfigur dem Feld hinzufügen
  AddToFeld(feld) {
    feld.appendChild(this.#domElementSpielfigur);
  }
  // anhand der Feldnummer das Objekt im Array suchen und den Spieler ins entsprechende DOM-Element platzieren
  SetFeld(Feld) {
    this.feldnummer = Number(Feld.feldnummer);
    this.AddToFeld(Feld.domElement);
  }
  // Feldnummer ermitteln 
  GetFeldNummer() {
    return this.feldnummer;
  }
  // Spieler in Spieleranzeige anzeigen
  spielerAnzeigen(){
    console.log(this.domElementSpieleranzeige.id);
    document.getElementById('spieleranzeige').appendChild(this.domElementSpieleranzeige);
  }
  // Spieler aus Spieleranzeige entfernen
  spielerAusAnzeigeEntfernen() {
    document.getElementById('spieleranzeige').removeChild(this.domElementSpieleranzeige);
  }

  // Ergebnis prüfen
  gewinnPruefen() {
    if (this.feldnummer >= 99) {
      // Gewinner verkünden
      alert(`${this.AktuellerSpieler} hat gewonnen!`)
      // Spiel beenden
    }
  }

  /*
  nicht mehr nötig
  --------------------------
  // Spieler-Methode zugBeenden
  zugBeenden() {
    this.spielerWechseln();
    setTimeout(() => {
      this.gewinnPruefen();
    }, 100);
  }
  -------------------------
*/
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
