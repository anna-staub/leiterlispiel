// ! Spielfeld erstellen
class Spiel {
  #gewinner = null;

  constructor() {
    // Speicher auslesen
    this.spielfeld = new Spielfeld();
    let feldVonFigur1 = Number(StorageService.get('spielfigur1'));
    let feldVonFigur2 = Number(StorageService.get('spielfigur2'));
    let letzterWurf = StorageService.get('letzter Wurf');
    let letzterSpieler = StorageService.get('letzter Spieler');
    // TODO: gespeicherte Werte einpflegen
    this.spielfigur1 = new Spielfigur(Feld, 'spielfigur1', 1, gespeicherteFarbe1, gespeicherterName1);
    this.spielfigur2 = new Spielfigur(Feld, 'spielfigur2', 2, gespeicherteFarbe2, gespeicherterName2);
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
    this.wuerfelergebnis = this.spielwuerfel.wuerfeln();
    this.spielwuerfel.wuerfelergebnisAusgeben(this.wuerfelergebnis);
    // Landefeld der Spielfigur ermitteln
    // Landefeld-Nummer = aktuellesFeld-Nummer + Wuerfelergebnis
    this.landefeldnummer = this.aktuelleSpielfigurFeldnummer + this.wuerfelergebnis;
    if (this.landefeldnummer >= 99){
      // this.aktuelleSpielfigur (DOM) in Zielfeld (DOM) platzieren
      this.landefeldnummer = 99 - (this.landefeldnummer - 99);
      this.spielfigurPlatzieren();
      if (this.landefeldnummer == 99) {
        this.siegAusrufen(this.landefeldnummer);
        // TODO: Spiel beenden/zurücksetzen? (Neues Spiel initialisieren?) (z. B. Dialog anzeigen: Spiel gewonnen! Option Spiel zurücksetzen)
      } else {
        this.aufLeiterfeldPruefen();
        spielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis, 'letzter Spieler');
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
      if (this.tauschfeldAbfragen) {
        if (debug_mode) {console.log('Tausch durchführen');}
        this.tauschDurchfuehren();
      }
      }
      spielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis, 'letzter Spieler');
      // in jedem Fall: Spieler wechseln
      this.spielerWechseln();
    }
    if (debug_mode) {console.log('landefeldnummer:'+this.landefeldnummer);}
  }

  spezialspielzug() {
    // Aktuelle Feldnummer der Spielfigur ermitteln
    this.aktuelleSpielfigurFeldnummer = this.aktuelleSpielfigur.getSpielfigurFeldNummer();
    // Würfeln und Resultat anzeigen
    this.wuerfelergebnis = this.spielwuerfel.spezialWuerfeln(-5,10);
    this.spielwuerfel.wuerfelergebnisAusgeben(this.wuerfelergebnis);
    // Landefeld der Spielfigur ermitteln
    // Landefeld-Nummer = aktuellesFeld-Nummer + Wuerfelergebnis
    this.landefeldnummer = this.aktuelleSpielfigurFeldnummer + this.wuerfelergebnis;
    if (this.landefeldnummer <0) {
      this.landefeldnummer = 0
      this.spielfigurPlatzieren();
      spielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis, 'letzter Spieler');
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
        spielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis, 'letzter Spieler');
        this.spielerWechseln();
      }
    } else {
      this.spielfigurPlatzieren();
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      this.aufLeiterfeldPruefen();
      spielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis, 'letzter Spieler');
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
    this.landefeldnummer=positionNeu;
    this.spielfigurPlatzieren();
    // Spielfigur wechseln
    this.spielerWechseln();
    // andere Spielfigur dem Feld mit der Feldnummer positionAlt zuweisen
    this.landefeldnummer=positionAlt;
    this.spielfigurPlatzieren();
    // Spielfigur wechseln
    this.spielerWechseln();
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
      // Sieger ausrufen 
      this.#gewinner=this.aktuelleSpielfigur.spielername;
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

// in Storage gespeicherte Werte in Variablen speichern
let gespeicherterName1 = StorageService.get('name1');
let gespeicherterName2 = StorageService.get('name2');
let gespeicherteFarbe1 = StorageService.get('farbe1');
let gespeicherteFarbe2 = StorageService.get('farbe2');

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
document.getElementById('nochmalspielen').addEventListener('click', () => {spiel.spielZuruecksetzen()});

// TODO: evtl. noch besseren Ort für die Funktiondefinition finden?
function neustart(form) {
  form.action = 'index.html';
  return false;
}

// neues Spiel mit neuen Spielern starten (zurück zur Startseite)
document.getElementById('neuesspiel').addEventListener('click', () => {
  // Storage löschen
  sessionStorage.clear();
  // zur Startseite navigieren
  neustart();
});