// ! Spielfeld erstellen
class Spiel {
  #gewinner = null;

  constructor() {
    this.spielfeld = new Spielfeld();
    // Speicher auslesen und in Variablen speichern
    let feldVonFigur1 = Number(StorageService.get('spielfigur1')); // wenn der Wert null ist, wird er mit Number() zu 0 umgewandelt
    let feldVonFigur2 = Number(StorageService.get('spielfigur2')); // wenn der Wert null ist, wird er mit Number() zu 0 umgewandelt
    let letzterWurf = StorageService.get('letzter Wurf');
    let letzterSpieler = StorageService.get('letzter Spieler');
    // Spielfiguren und Würfel instanzieren
    this.spielfigur1 = new Spielfigur('spielfigur1', 1, gespeicherteFarbe1, gespeicherterName1);
    this.spielfigur2 = new Spielfigur('spielfigur2', 2, gespeicherteFarbe2, gespeicherterName2);
    this.spielwuerfel = new Wuerfel(6);
    // zuletzt gewürfelte Zahl anzeigen wenn im Speicher vorhanden
    if(letzterWurf != null) {
      this.spielwuerfel.wuerfelergebnisAusgeben(letzterWurf);
    }
    // Bei aktivem zug54 Modus Aktivierung des 1er-Würfels für den Test des Tauschfeldes
    if (zug54mode) {
      this.spielwuerfel = new Wuerfel(1);
    }
    // Spielfigur bestimmen, welche am Zug ist
    if((letzterSpieler == 'spielfigur2' && letzterWurf == '6') | (letzterSpieler == 'spielfigur1' && letzterWurf != '6' && letzterWurf != '')) {
      this.aktuelleSpielfigur = this.spielfigur2;
    } else {
      this.aktuelleSpielfigur = this.spielfigur1;
    }
    // gespeicherte Feldnummer von spielfigur1 verwenden wenn vorhanden -> wenn nicht vorhanden ist der Wert 0 (siehe Erklärung bei let feldVonFigur1)
    let startfeld = this.spielfeld.getFeldUeberFeldnummer(feldVonFigur1);
    this.spielfigur1.setFeld(startfeld);
    this.spielfigur1.addToFeld(startfeld.domElement);
    // gespeicherte Feldnummer von spielfigur2 verwenden wenn vorhanden (analog zu spielfigur1)
    startfeld = this.spielfeld.getFeldUeberFeldnummer(feldVonFigur2);
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
        // Abfragen, ob getauscht werden soll, falls Abfrage true ergibt: Tausch durchführen
        setTimeout(() => {if (this.tauschfeldAbfragen()) {
          if (debug_mode) {console.log('Tausch durchführen');}
          this.tauschDurchfuehren();
        }},500);
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
        // Abfragen, ob getauscht werden soll, falls Abfrage true ergibt: Tausch durchführen
        setTimeout(() => {if (this.tauschfeldAbfragen()) {
          if (debug_mode) {console.log('Tausch durchführen');}
          this.tauschDurchfuehren();
        }},500);
      }
      spielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis, 'letzter Spieler');
      this.spielerWechseln();
    }
    if (debug_mode) {console.log('landefeldnummer:'+this.landefeldnummer);}
  }

  // Testfunktion, um aktuelle Spielfigur auf Feld 54 zu setzen (zum Testen den zug54mode auf true setzen und im spiel.html den Testbutton auskommentieren)
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
      console.log('Ja, Figuren tauschen!');
      return true;      
    } else{
      console.log('Nein, Figuren NICHT tauschen!');
      return false;
    }
  }

  tauschDurchfuehren() {
    let positionAlt = this.landefeldnummer;
    let positionNeu;
    if (this.aktuelleSpielfigur === this.spielfigur1) {
      positionNeu = this.spielfigur2.getSpielfigurFeldNummer();
    } else {
     positionNeu = this.spielfigur1.getSpielfigurFeldNummer();
    }
    console.log('Alte Position = '+positionAlt+'. Neue Position = '+positionNeu);
    // aktuelleSpielfigur dem Feld mit der Feldnummer positionNeu zuweisen
    this.landefeldnummer = positionNeu;
    this.spielfigurPlatzieren();
    // Spielfigur wechseln
    this.spielerWechseln();
    // andere Spielfigur dem Feld mit der Feldnummer positionAlt zuweisen
    setTimeout(() => {
      this.landefeldnummer = positionAlt;
      this.spielfigurPlatzieren();
      teilspielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis);
    },510);
    // Spielfigur wechseln
    this.spielerWechseln();
    teilspielstandSpeichern(this.aktuelleSpielfigur.spielfigurname, this.landefeldnummer, 'letzter Wurf', this.wuerfelergebnis);
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
      setTimeout(() => {
        alert(this.#gewinner+' hat gewonnen!');
        // Spieler fragen, ob sie nochmal spielen wollen und je nach Antwort das Spiel neu starten
        let antwort = confirm('Nochmal spielen?');
        if(antwort == true) {
          this.spielZuruecksetzen();
        } else if(antwort == false) {
          // Storage löschen
          sessionStorage.clear();
          // zur Startseite navigieren
          location.href = '../../index.html';
        }
      }, 500);
    }
  }

  spielZuruecksetzen() {
    // gespeicherte Feldnummer der Spielfiguren und letzter Wurf korrigieren
    StorageService.set('spielfigur1', 0);
    StorageService.set('spielfigur2', 0);
    StorageService.set('letzter Wurf', '');
    this.spielwuerfel.wuerfelergebnisAusgeben('');
    // Startspieler festlegen
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

// zug54 Modus zum testen des Tauschfeldes
let zug54mode = false;

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

// Button um direkt zu Feld 54 zu gelangen entfernen, wenn der zug54 Modus deaktiviert ist
if (zug54mode === false) {
  document.getElementById('zuFeld54').style.display='none';
}
// Auslöser, um Spielfigur direkt auf Feld 54 setzen
document.getElementById('zuFeld54').addEventListener('click', () => {
  spiel.spielzug54();
});

// Spiel neu starten (mit den selben Spielern)
document.getElementById('nochmalspielen').addEventListener('click', () => {spiel.spielZuruecksetzen()});

// TODO: evtl. noch besseren Ort für die Funktiondefinition finden?
function neustart(form) {
  form.action = './index.html';
  return false;
}

// neues Spiel mit neuen Spielern starten (zurück zur Startseite)
document.getElementById('neuesspiel').addEventListener('click', () => {
  // Storage löschen
  sessionStorage.clear();
  // zur Startseite navigieren
  neustart();
});