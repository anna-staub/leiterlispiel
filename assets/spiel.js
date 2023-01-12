// Spielfeld erstellen
class Spiel {
  constructor() {
    this.spielfeld = new Spielfeld();
    this.spieler1 = new Spieler(Feld, 'spieler1');
    this.spieler2 = new Spieler(Feld, 'spieler2');
    this.spielwuerfel = new Wuerfel(6);
    this.aktuellerSpieler = this.spieler1;
    let startfeld = this.spielfeld.GetFeldUeberFeldnummer(0);
    this.spieler1.SetFeld(startfeld);
    this.spieler2.SetFeld(startfeld);
    this.spieleranzeige = new Spieleranzeige(this);
    this.spieleranzeige.spielerAnzeigen();
  }

  Spielzug() {
    // Aktuelle Feldnummer des Spielers ermitteln
    this.aktuelleFeldnummer = this.aktuellerSpieler.GetFeldNummer();
    // Würfeln
    this.wuerfelergebnis = this.spielwuerfel.wuerfeln();
    // Landefeld des Spielers ermitteln
    // Landefeld-Nummer = aktuellesFeld-Nummer + Wuerfelergebnis
    this.landefeldnummer = this.aktuelleFeldnummer + this.wuerfelergebnis;
    if (this.landefeldnummer >= 99){
      // this.aktuellerSpieler (DOM) in Zielfeld (DOM) platzieren
      this.landefeldnummer = 99;
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.GetFeldUeberFeldnummer(this.landefeldnummer);
      // Spieler die entsprechende Feldnummer zuschreiben und Spieler-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuellerSpieler.SetFeld(this.landefeldObjekt);
      // Sieger ausrufen (spielername ist noch etwas unschön)
      setTimeout(() => {alert(this.aktuellerSpieler.spielername+' hat gewonnen!')}, 500);
      // Spiel zurücksetzen? (Neues Spiel initialisieren?)
    } else {
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.GetFeldUeberFeldnummer(this.landefeldnummer);
      // Spieler die entsprechende Feldnummer zuschreiben und Spieler-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuellerSpieler.SetFeld(this.landefeldObjekt);
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      if (this.landefeldObjekt instanceof Leiterfeld) {
        console.log('landefeldnummer:'+this.landefeldnummer)
        let zielfeld = '';
        // zielfeld zum aktuellen Feld aus SPIELFELD_LEITERKONFIG herauslesen
        SPIELFELD_LEITERKONFIG.forEach((objekt) => {
          if (objekt.id === this.landefeldnummer) {
            zielfeld = objekt.zielfeld;
            return zielfeld;
          }
        });
        this.landefeldnummer = zielfeld;
        this.landefeldObjekt = this.spielfeld.GetFeldUeberFeldnummer(this.landefeldnummer);
        // ...wird der Spieler dem Zielfeld des entsprechenden Leiterfelds angehängt.
        setTimeout(() => {this.aktuellerSpieler.SetFeld(this.landefeldObjekt)}, 500); // Würfelt man erneut bevor die Leiter benutzt wurde, wird dies übersprungen -> während time-out darf nichts anderes gemacht werden
      }

      // Wenn nicht 6 gewürfelt wurde wechselt der aktuelle Spieler, bei 6 bleibt er gleich.
      setTimeout(() => {if (this.wuerfelergebnis != 6) {
        // Spieleranzeige leeren
        this.spieleranzeige.spielerAusAnzeigeEntfernen();
        //Spieler wechseln
        this.aktuellerSpieler = this.aktuellerSpieler === this.spieler1? this.spieler2 : this.spieler1;
        // Spieleranzeige mit aktuellem Spieler füllen
        this.spieleranzeige.spielerAnzeigen();
      }}, 500);
    }
    console.log('landefeldnummer:'+this.landefeldnummer)
  }

  spielZuruecksetzen() {
    if (this.aktuellerSpieler === this.spieler2) {
      this.aktuellerSpieler.spielerAusAnzeigeEntfernen();
      this.aktuellerSpieler = this.spieler1;
    }
    let startfeld = this.spielfeld.GetFeldUeberFeldnummer(0);
    this.spieler1.SetFeld(startfeld);
    this.spieler2.SetFeld(startfeld);
    this.aktuellerSpieler.spielerAnzeigen();
  }
}

// neues Spiel instanzieren
let spiel = new Spiel();

// Methode Spielzug auslösen, sobald gewürfelt wird
document.getElementById("wuerfelbutton").addEventListener('click', () => {spiel.Spielzug()});

// Spiel neu starten
document.getElementById("neuesspiel").addEventListener('click', () => {spiel.spielZuruecksetzen()})