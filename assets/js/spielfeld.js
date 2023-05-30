class Spielfeld {
  // Array von Feldern
  #felderArray = [];
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

      // Prüfen, ob ein Objekt mit j als id im Leiterkonfig-Array vorhanden ist (Leiter-Start)
      let konfig = SPIELFELD_LEITERKONFIG.find(konfig => konfig.id === j);
      // Prüfen, ob ein Objekt mit j als zielfeld im Leiterkonfig-Array vorhanden ist (Leiter-Ziel)
      let landekonfig = SPIELFELD_LEITERKONFIG.find(landekonfig => landekonfig.zielfeld === j);

      if (debug_mode) {console.log('konfig ist: '+konfig);} // gibt undefined bei normalem Feld oder [object Object] bei Leiterfeld
      if (debug_mode) {console.log('landekonfig ist: '+landekonfig);} // gibt undefined bei normalem Feld oder [object Object] bei Leiterfeld

      // Wenn ein Objekt mit j als id im Leiterkonfig-Array vorhanden ist, wird das neue Feld als Leiterfeld instanziert.
      if (konfig) { 
        feld = new Leiterfeld(this, j, konfig.zielfeld);
        if (debug_mode) {console.log('ist feld leiterfeld? ');}
        if (debug_mode) {console.log(feld instanceof Leiterfeld);}  // gibt true
        if (debug_mode) {console.log('zielfeld: '+feld.Zielfeld);}

        // Leiterfeld der Hoch- oder Runter-Klasse zuordnen
        if (j > konfig.zielfeld) {
          if (debug_mode) {console.log('leiterfeld runter');}
          feld.leiterfeldRunterStartKlassieren();
        } else if (j < konfig.zielfeld) {
          if (debug_mode) {console.log('leiterfeld hoch');}
          feld.leiterfeldHochStartKlassieren();
        }
        // Zugehöriges Zielfeld ins Leiterfeld schreiben
        // feld.domElement.innerHTML+='<br />gehe zu '+konfig.zielfeld;    

      } else {
        // Normales Feld instanzieren
        feld = new Feld(this, j);
        if (debug_mode) {console.log('ist feld leiterfeld? ');}
        if (debug_mode) {console.log(feld instanceof Leiterfeld);} // gibt false
        feld.normalesFeldKlassieren();
        // Wenn das Feld ein Leiterzielfeld ist, erhält es die entsprechende Klasse
        if (landekonfig) {
          if (landekonfig.zielfeld < landekonfig.id) {
            if (debug_mode){console.log('Zielfeld is grösser als ID')}
          feld.leiterfeldRunterEndeKlassieren();
        } else if (landekonfig.zielfeld > landekonfig.id){
          if (debug_mode){console.log('Zielfeld is kleiner als ID')}
            feld.leiterfeldHochEndeKlassieren();
        }
      }
      }

      // Feld dem Array hinzufügen
      this.#felderArray.push(feld);

      // DOM-Element (Felder) dem Spielfeld hinzufügen
      feld.addToBoard(this.#domElement);
    }
  }
  // Methode um entsprechendes Feld-Objekt anhand von Feldnummer aus dem Felder-Array zu holen
  getFeldUeberFeldnummer(feldnummer) {
    for (let i = 0 ; i < this.#felderArray.length ; i++){
      if (this.#felderArray[i].feldnummer === feldnummer) {
        return this.#felderArray[i];
      }
    }
  }
}