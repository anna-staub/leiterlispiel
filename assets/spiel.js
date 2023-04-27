// ! Spielfeld erstellen
class Spiel {
  #gewinner = null;

  constructor() {
    // Speicher auslesen
    this.spielfeld = new Spielfeld();
    this.spielfigur1 = new Spielfigur(Feld, 'spielfigur1', 1);
    this.spielfigur2 = new Spielfigur(Feld, 'spielfigur2', 2);
    this.spielwuerfel = new Wuerfel(6);
    this.aktuelleSpielfigur = this.spielfigur1;
    // Aktuelle Feldnummer der Spielfigur ermitteln
    let startfeld = this.spielfeld.getFeldUeberFeldnummer(0);
    this.spielfigur1.setFeld(startfeld);
    this.spielfigur1.addToFeld(startfeld.domElement);
    this.spielfigur2.setFeld(startfeld);
    this.spielfigur2.addToFeld(startfeld.domElement);
    this.spielfiguranzeige = new Spielfiguranzeige(this);
    this.spielfiguranzeige.spielfigurAnzeigen();
  }

  spielzug() {
    // Aktuelle Feldnummer der Spielfigur ermitteln
    this.aktuelleSpielfigurFeldnummer = this.aktuelleSpielfigur.getSpielfigurFeldNummer();
    // Würfeln und Resultat anzeigen
    this.wuerfelergebnis = this.spielwuerfel.wuerfeln(); // ! Würfelergebnis speichern
    this.spielwuerfel.wuerfelergebnisAusgeben(this.wuerfelergebnis);
    // Landefeld der Spielfigur ermitteln
    // Landefeld-Nummer = aktuellesFeld-Nummer + Wuerfelergebnis
    this.landefeldnummer = this.aktuelleSpielfigurFeldnummer + this.wuerfelergebnis;
    if (this.landefeldnummer >= 99){
      // this.aktuelleSpielfigur (DOM) in Zielfeld (DOM) platzieren
      this.landefeldnummer = 99 - (this.landefeldnummer - 99);
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
      this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
      if (this.landefeldnummer == 99) {
        this.siegAusrufen(this.landefeldnummer);
        // TODO: Spiel beenden/zurücksetzen? (Neues Spiel initialisieren?) (z. B. Dialog anzeigen: Spiel gewonnen! Option Spiel zurücksetzen)
      } else {
        this.aufLeiterfeldPruefen();
        this.spielerWechseln();
      }
    } else {
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
      this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      this.aufLeiterfeldPruefen();
      this.spielerWechseln();
    }
    if (debug_mode) {console.log('landefeldnummer:'+this.landefeldnummer);}
  }

  spezialspielzug() {
    // Aktuelle Feldnummer der Spielfigur ermitteln
    this.aktuelleSpielfigurFeldnummer = this.aktuelleSpielfigur.getSpielfigurFeldNummer();
    // Würfeln und Resultat anzeigen
    this.wuerfelergebnis = this.spielwuerfel.spezialWuerfeln(-5,10); // ! Würfelergebnis speichern
    this.spielwuerfel.wuerfelergebnisAusgeben(this.wuerfelergebnis);
    // Landefeld der Spielfigur ermitteln
    // Landefeld-Nummer = aktuellesFeld-Nummer + Wuerfelergebnis
    this.landefeldnummer = this.aktuelleSpielfigurFeldnummer + this.wuerfelergebnis;
    if (this.landefeldnummer <0) {
      this.landefeldnummer = 0   
    } 
    if (this.landefeldnummer >= 99) {
      // this.aktuelleSpielfigur (DOM) in Zielfeld (DOM) platzieren
      this.landefeldnummer = 99 - (this.landefeldnummer - 99);
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
      this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
      if (this.landefeldnummer == 99) {
        this.siegAusrufen(this.landefeldnummer);
        // TODO: Spiel beenden/zurücksetzen? (Neues Spiel initialisieren?) (z. B. Dialog anzeigen: Spiel gewonnen! Option Spiel zurücksetzen)
      } else {
        this.aufLeiterfeldPruefen();
        this.spielerWechseln();
      }
    } else {
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
      this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      this.aufLeiterfeldPruefen();
      this.spielerWechseln();
    }
    if (debug_mode) {console.log('landefeldnummer:'+this.landefeldnummer);}
  }

  aufLeiterfeldPruefen() {
    if (this.landefeldObjekt instanceof Leiterfeld) {
      if (debug_mode) {console.log('Leiter-Start:'+this.landefeldnummer);}
      this.leiterBenutzen();
    }
  }

  leiterBenutzen() {
    let zielfeld = '';
      // zielfeld zum aktuellen Feld aus SPIELFELD_LEITERKONFIG herauslesen
      SPIELFELD_LEITERKONFIG.forEach((objekt) => {
        if (objekt.id === this.landefeldnummer) {
          zielfeld = objekt.zielfeld;
          return zielfeld;
        }
      });
      this.landefeldnummer = zielfeld;
      if (debug_mode) {console.log('Leiter-Ende:'+this.landefeldnummer);}
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // ...wird die Spielfigur dem Zielfeld des entsprechenden Leiterfelds angehängt.
      setTimeout(() => {this.aktuelleSpielfigur.setFeld(this.landefeldObjekt); this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);}, 500);
  }
  
  spielerWechseln() {
    // Wenn nicht 6 gewürfelt wurde wechselt die aktuelle Spielfigur, bei 6 bleibt er gleich.
    setTimeout(() => {if (this.wuerfelergebnis != 6) {
      // Spielfiguranzeige leeren
      this.spielfiguranzeige.spielfigurAusAnzeigeEntfernen();
      //Spielfigur wechseln
      this.aktuelleSpielfigur = this.aktuelleSpielfigur === this.spielfigur1? this.spielfigur2 : this.spielfigur1;
      // Spielfiguranzeige mit aktuelle Spielfigur füllen
      this.spielfiguranzeige.spielfigurAnzeigen();
    }}, 500);
  }
  
  siegAusrufen(landefeldnummer) {
    if (landefeldnummer == 99){
      // Sieger ausrufen (spielfigurname ist noch etwas unschön)
      if (this.aktuelleSpielfigur.spielfigurname === 'spielfigur1') {
        this.#gewinner = 'blau';
      } else {
        this.#gewinner = 'rot';
      }
      setTimeout(() => {alert(this.#gewinner+' hat gewonnen!')}, 500);
    }
  }

  spielZuruecksetzen() {
    if (this.aktuelleSpielfigur === this.spielfigur2) {
      this.spielfiguranzeige.spielfigurAusAnzeigeEntfernen();
      this.aktuelleSpielfigur = this.spielfigur1;
    }
    let startfeld = this.spielfeld.getFeldUeberFeldnummer(0);
    this.spielfigur1.setFeld(startfeld);
    this.spielfigur1.addToFeld(startfeld.domElement);
    this.spielfigur2.setFeld(startfeld);
    this.spielfigur2.addToFeld(startfeld.domElement);
    this.spielfiguranzeige.spielfigurAnzeigen();
  }
}
// Debug Modus zum deaktivieren von console.logs
let debug_mode = false;

// neues Spiel instanzieren
let spiel = new Spiel();

// Methode Spielzug auslösen, sobald gewürfelt wird
document.getElementById('wuerfelbutton').addEventListener('click', () => {
  // Würfel während des Spielzugs disablen
  document.getElementById('wuerfelbutton').setAttribute('disabled', '');
  spiel.spielzug()
  // Würfel nach Spielzug wieder enablen
  setTimeout(() => {document.getElementById('wuerfelbutton').removeAttribute('disabled')}, 500);
});

// Methode Spezialzug auslösen, sobald gewürfelt wird
document.getElementById('spezialwuerfelbutton').addEventListener('click', () => {
  // Würfel während des Spielzugs disablen
  document.getElementById('spezialwuerfelbutton').setAttribute('disabled', '');
  spiel.spezialspielzug()
  // Würfel nach Spielzug wieder enablen
  setTimeout(() => {document.getElementById('spezialwuerfelbutton').removeAttribute('disabled')}, 500);
});

// Spiel neu starten
document.getElementById('neuesspiel').addEventListener('click', () => {spiel.spielZuruecksetzen()})