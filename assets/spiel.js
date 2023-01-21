// Spielfeld erstellen
class Spiel {
  #spielId = 0;
  #gewinner = '';

  constructor(spielId) {
    this.#spielId = spielId;
    this.spielfeld = new Spielfeld();
    this.spielfigur1 = new Spielfigur(Feld, 'spielfigur1', 1); // provisorisch fixe Id gesetzt, wird später noch zu automatisch generierter Id geändert
    this.spielfigur2 = new Spielfigur(Feld, 'spielfigur2', 2); // provisorisch fixe Id gesetzt, wird später noch zu automatisch generierter Id geändert
    this.spielwuerfel = new Wuerfel(6);
    this.aktuelleSpielfigur = this.spielfigur1;
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
    this.wuerfelergebnis = this.spielwuerfel.wuerfeln();
    this.spielwuerfel.wuerfelergebnisAusgeben(this.wuerfelergebnis);
    // Landefeld der Spielfigur ermitteln
    // Landefeld-Nummer = aktuellesFeld-Nummer + Wuerfelergebnis
    this.landefeldnummer = this.aktuelleSpielfigurFeldnummer + this.wuerfelergebnis;
    if (this.landefeldnummer >= 99){
      // this.aktuelleSpielfigur (DOM) in Zielfeld (DOM) platzieren
      this.landefeldnummer = 99;
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
      this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
      // Sieger ausrufen (spielfigurname ist noch etwas unschön)
      if (this.aktuelleSpielfigur.spielfigurname === 'spielfigur1') {
        this.#gewinner = 'blau';
      } else {
        this.#gewinner = 'rot';
      }
      setTimeout(() => {alert(this.#gewinner+' hat gewonnen!')}, 500);
      // Spiel zurücksetzen? (Neues Spiel initialisieren?)
    } else {
      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
      // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
      this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      if (this.landefeldObjekt instanceof Leiterfeld) {
        if (debug_mode) {console.log('Leiter-Start:'+this.landefeldnummer);}
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
    if (debug_mode) {console.log('landefeldnummer:'+this.landefeldnummer);}
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
let spiel = new Spiel(1); // provisorisch fixe Id gesetzt, wird später noch zu automatisch generierter Id geändert


// Methode Spielzug auslösen, sobald gewürfelt wird
document.getElementById('wuerfelbutton').addEventListener('click', () => {
  // Würfel während des Spielzugs disablen
  document.getElementById('wuerfelbutton').setAttribute('disabled', '');
  spiel.spielzug()
  // Würfel nach Spielzug wieder enablen
  setTimeout(() => {document.getElementById('wuerfelbutton').removeAttribute('disabled')}, 500);
});

// Spiel neu starten
document.getElementById('neuesspiel').addEventListener('click', () => {spiel.spielZuruecksetzen()})