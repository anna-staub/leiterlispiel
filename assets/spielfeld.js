class Spielfeld {
    // Array von Feldern
    felderArray = [];
    // DOM-Element (Spielfeld)
    #domElement = document.getElementById('board');
    // Gewinnzustand

  
    // Spielfeld-Instanz erstellen
    constructor() {
      for (let i = 99; i>-1; i--) {
        let j=i
        if (Math.floor(i/10) % 2 === 0) {
         j = Math.floor(i / 10) * 10 + (9 - i % 10);
        } 
        console.log('i (Platz im Array) ist: '+i);
        console.log('j (Feldbeschriftung) ist: '+j);
        let feld = null;
        let konfig = SPIELFELD_LEITERKONFIG.find(konfig => konfig.id === j); // konfig ist undefined, müsste aber eigentlich das Objekt zurückgeben
        console.log('konfig ist: '+konfig); // gibt undefined bei normalem Feld oder [object Object] bei Leiterfeld
        if (konfig) { // hier müsste "konfig" den Wert "true" haben, oder? Hat aber Wert [Object object] -> evtl. wird nicht auf true sondern auf das Vorhandensein eines Werts geprüft, weil das nachfolgende funktioniert ja
          feld = new Leiterfeld(this, j, konfig.zielfeld);
          console.log('ist feld leiterfeld? ');
          console.log(feld instanceof Leiterfeld);  // gibt true
          feld.LeiterfeldKlassieren(); 
          console.log('zielfeld: '+feld.Zielfeld)
        } else {
          feld = new Feld(this, j);
          console.log('ist feld leiterfeld? ');
          console.log(feld instanceof Leiterfeld); // gibt false
          feld.NormalesFeldKlassieren();
        }
        this.felderArray.push(feld);
        // DOM-Element (Felder) dem Spielfeld hinzufügen
        feld.AddToBoard(this.#domElement);
      }
    }
    // Methode um entsprechendes Feld-Objekt anhand von Feldnummer aus dem Felder-Array zu holen
    GetFeldUeberFeldnummer(feldnummer) {
      for (let i = 0 ; i < this.felderArray.length ; i++){
        if (this.felderArray[i].feldnummer === feldnummer) {
          return this.felderArray[i];
        }
      }
    }
    // Spieler-Methode Spieler wechseln
    // ich bin mir nicht sicher, wo das genau hingehört.. passt das hier?
    spielerWechseln() {
      this.AktuellerSpieler = this.AktuellerSpieler === 'spieler1' ? 'spieler2' : 'spieler1';
      this.domElementAktuellerSpieler.className = this.AktuellerSpieler;
    }
  }
  