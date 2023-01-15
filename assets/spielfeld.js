class Spielfeld {
    // Array von Feldern
    felderArray = [];
    // DOM-Element (Spielfeld)
    #domElement = document.getElementById('board');
  
    // Spielfeld-Instanz erstellen
    constructor() {
      for (let i = 99; i>-1; i--) {
        let j=i
        if (Math.floor(i/10) % 2 === 0) {
         j = Math.floor(i / 10) * 10 + (9 - i % 10);
        } 
        // i = Platz im Array
        // J = Feldbeschriftung
        let feld = null;
        let konfig = SPIELFELD_LEITERKONFIG.find(konfig => konfig.id === j);
        // console.log('konfig ist: '+konfig); // gibt undefined bei normalem Feld oder [object Object] bei Leiterfeld
        if (konfig) { // prüfen, ob ein Wert vorhanden ist oder nicht
          feld = new Leiterfeld(this, j, konfig.zielfeld);
          // console.log('ist feld leiterfeld? ');
          // console.log(feld instanceof Leiterfeld);  // gibt true
          feld.LeiterfeldKlassieren(); 
          // console.log('zielfeld: '+feld.Zielfeld)
        } else {
          feld = new Feld(this, j);
          // console.log('ist feld leiterfeld? ');
          // console.log(feld instanceof Leiterfeld); // gibt false
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
  }