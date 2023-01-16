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

        // Prüfen, ob ein Objekt mit j als id im Leiterkonfig-Array vorhanden ist
        let konfig = SPIELFELD_LEITERKONFIG.find(konfig => konfig.id === j);
        if (debug_mode) {console.log('konfig ist: '+konfig);} // gibt undefined bei normalem Feld oder [object Object] bei Leiterfeld

        // Wenn ein Objekt mit j als id im Leiterkonfig-Array vorhanden ist, wird das neue Feld als Leiterfeld instanziert.
        if (konfig) { // gibt true oder false
          feld = new Leiterfeld(this, j, konfig.zielfeld);
          if (debug_mode) {console.log('ist feld leiterfeld? ');}
          if (debug_mode) {console.log(feld instanceof Leiterfeld);}  // gibt true
          if (debug_mode) {console.log('zielfeld: '+feld.Zielfeld);}

          // Leiterfeld der Hoch- oder Runter-Klasse zuordnen
          if (j > konfig.zielfeld) {
            if (debug_mode) {console.log('leiterfeld runter');}
            feld.LeiterfeldRunterKlassieren();

          } else if (j < konfig.zielfeld) {
            if (debug_mode) {console.log('leiterfeld hoch');}
            feld.LeiterfeldHochKlassieren();
          }
          // Zugehöriges Zielfeld ins Leiterfeld schreiben
          feld.domElement.innerHTML+='<br />go to '+konfig.zielfeld;    

        } else {
          // Normales Feld instanzieren
          feld = new Feld(this, j);
          if (debug_mode) {console.log('ist feld leiterfeld? ');}
          if (debug_mode) {console.log(feld instanceof Leiterfeld);} // gibt false
          feld.NormalesFeldKlassieren();
        }

        // Feld dem Array hinzufügen
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