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
    this.aktuellerSpieler.spielerAnzeigen();
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

        // Sieger ausrufen (spielername ist noch etwas unschön)
        alert(this.aktuellerSpieler.spielername+' hat gewonnen!');

        // Spiel zurücksetzen? (Neues Spiel initialisieren?)
      } else {

      // Der Landefeldnummer entsprechendes Objekt aus dem Felder-Array holen
      this.landefeldObjekt = this.spielfeld.GetFeldUeberFeldnummer(this.landefeldnummer);
  
      // Spieler die entsprechende Feldnummer zuschreiben und Spieler-DOM-Element in entsprechendes Feld-DOM-Element platzieren
      this.aktuellerSpieler.SetFeld(this.landefeldObjekt);
  
      // Wenn die aktuelle Feldnummer anzeigt, dass das aktuelle Feld ein Leiterfeld ist...
      if (this.aktuelleFeldnummer === Leiterfeld) {
        // ...wird der Spieler dem Zielfeld des entsprechenden Leiterfelds angehängt.
        this.aktuellerSpieler.AddToFeld(this.aktuelleFeldnummer);
      }

      // Wenn die aktuelle Feldnummer höher oder gleich 99 ist...
      if (this.aktuelleFeldnummer.id >= 99) {
        alert(aktuellerSpieler.spielername + ' hat gewonnen!')
          // ...Sieg ausrufen, Spiel zurücksetzen
          // FUNKTIONIERT NOCH NICHT, feldnummern über 99 sind undefined.
        }

      // Wenn nicht 6 gewürfelt wurde wechselt der aktuelle Spieler, bei 6 bleibt er gleich.
      if (this.wuerfelergebnis != 6) {
          // Spieleranzeige leeren
          this.aktuellerSpieler.spielerAusAnzeigeEntfernen();
          //Spieler wechseln
          this.aktuellerSpieler = this.aktuellerSpieler === this.spieler1? this.spieler2 : this.spieler1;
          // Spieleranzeige mit aktuellem Spieler füllen
          this.aktuellerSpieler.spielerAnzeigen();
        }
  
    }
  
  }
}

//neues Spiel instanzieren
let spiel = new Spiel();


// Methode Spielzug auslösen, sobald gewürfelt wird
// document.getElementById("wuerfelbutton").addEventListener('click', spiel.Spielzug); ---> geht nicht! Listener muss funktion sein, sonst pointet this aufs objekt, welches eventListener ausgelöst hat!
document.getElementById("wuerfelbutton").addEventListener('click', function () {spiel.Spielzug() }); // korrekt :')


 