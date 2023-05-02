// ! Spielfeld erstellen
class Spiel {
  #gewinner = null;

  constructor() {
    // Speicher auslesen
    this.spielfeld = new Spielfeld();
    this.spielfigur1 = new Spielfigur(Feld, 'spielfigur1', 1);
    this.spielfigur2 = new Spielfigur(Feld, 'spielfigur2', 2);
    this.spielwuerfel = new Wuerfel(6);
    // zu Testzwecken: this.spielwuerfel = new Wuerfel(1);
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
      this.spielfigurPlatzieren();
      // Sind diese Zeilen nicht eigentlich unnötig? Wenn man über 99 hinausfährt ist es nicht möglich, dass man am Ende des Zuges auf 99 landet. / 30.4.2023, Anna
      if (this.landefeldnummer == 99) {
        this.siegAusrufen(this.landefeldnummer);
        // TODO: Spiel beenden/zurücksetzen? (Neues Spiel initialisieren?) (z. B. Dialog anzeigen: Spiel gewonnen! Option Spiel zurücksetzen)
      } else {
        this.aufLeiterfeldPruefen();
        this.spielerWechseln();
      }
    } else {
      this.spielfigurPlatzieren();
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      this.aufLeiterfeldPruefen();
      // Spezialfeld für Spielfigurentausch prüfen
      if (this.landefeldnummer == 55) {
        this.spielfigurPlatzieren();
      // Abfragen, ob getauscht werden soll
      this.tauschfeldAbfragen();
      // Falls Abfrage true ergibt: Tausch durchführen (funktioniert noch nicht / timing)
      if (this.tauschfeldAbfragen == true) {
        if (debug_mode) {console.log('Tausch durchführen');}
        this.tauschDurchfuehren();
      }
      }
      // in jedem Fall: Spieler wechseln
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
      this.spielfigurPlatzieren();
      this.spielerWechseln();   
    } else if (this.landefeldnummer >= 99) {
      // this.aktuelleSpielfigur (DOM) in Zielfeld (DOM) platzieren
      this.landefeldnummer = 99 - (this.landefeldnummer - 99);
      this.spielfigurPlatzieren();
      if (this.landefeldnummer == 99) {
        this.siegAusrufen(this.landefeldnummer);
        // TODO: Spiel beenden/zurücksetzen? (Neues Spiel initialisieren?) (z. B. Dialog anzeigen: Spiel gewonnen! Option Spiel zurücksetzen)
      } else {
        this.aufLeiterfeldPruefen();
        this.spielerWechseln();
      }
    } else {
      this.spielfigurPlatzieren();
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      this.aufLeiterfeldPruefen();
      this.spielerWechseln();
    }
    if (debug_mode) {console.log('landefeldnummer:'+this.landefeldnummer);}
  }

  // Testfunktion, um aktuelle Spielfigur auf Feld 54 setzen (zum testen Würfel(1) noch enablen)
  spielzug54() {
    this.landefeldnummer = 54;
    this.spielfigurPlatzieren();
    this.spielerWechseln();
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

  spielfigurPlatzieren() {
    // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
    this.landefeldObjekt = this.spielfeld.getFeldUeberFeldnummer(this.landefeldnummer);
    // Spielfigur die entsprechende Feldnummer zuschreiben und Spielfigur-DOM-Element in entsprechendes Feld-DOM-Element platzieren
    this.aktuelleSpielfigur.setFeld(this.landefeldObjekt);
    this.aktuelleSpielfigur.addToFeld(this.landefeldObjekt.domElement);
  }
  
  tauschfeldAbfragen() {
    console.log('Du bist auf dem Tauschfeld gelandet.');
    if (window.confirm('Möchtest du mit der gegnerischen Spielfigur Platz tauschen?')) {
      console.log('Figuren tauschen!');
      return true;      
    } else{
      console.log('Figuren NICHT tauschen');
      return false;
    }
  }

  tauschDurchfuehren() {
    let positionAlt = this.aktuelleSpielfigurFeldnummer;
    let positionNeu;
    if (this.aktuelleSpielfigur === this.spielfigur1) {
      positionNeu = this.spielfigur2.getSpielfigurFeldNummer();
    } else {
     positionNeu = this.spielfigur1.getSpielfigurFeldNummer();
    }
    console.log('Alte Position = '+positionAlt+'. Neue Position = '+positionNeu);
    // aktuelleSpielfigur dem Feld mit der Feldnummer positionNeu zuweisen
    // andere Spielfigur dem Feld mit der Feldnummer positionAlt zuweisen
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
let debug_mode = true;

// neues Spiel instanzieren
let spiel = new Spiel();

// Methode Spielzug auslösen, sobald gewürfelt wird
let wuerfelbuttons = document.querySelectorAll('#wuerfelfeld button');
wuerfelbuttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Würfel während des Spielzugs disablen
    wuerfelSperren()
    if (button.id === 'wuerfelbutton') {
      spiel.spielzug();
    } else if (button.id === 'spezialwuerfelbutton') {
      spiel.spezialspielzug();
    }
    // Würfel nach Spielzug wieder enablen
    wuerfelEntsperren()
  });
});

// Auslöser, um Spielfigur direkt auf Feld 54 setzen
document.getElementById('zuFeld54').addEventListener('click', () => {
  spiel.spielzug54();
});


// Spiel neu starten (mit den selben Spielern)
document.getElementById('nochmalspielen').addEventListener('click', () => {spiel.spielZuruecksetzen()})


function wuerfelSperren() {
  wuerfelbuttons.forEach((button) => {
    button.setAttribute('disabled', '')
  });
}

function  wuerfelEntsperren() {
  setTimeout(() => {
    wuerfelbuttons.forEach((button) => {
      button.removeAttribute('disabled')
    });
  }, 500);
}