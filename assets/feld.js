class Feld {
    // Markierung (Spieler-Repräsentation)
      // nicht so umsetzen, dass das Feld "weiss", welcher Spieler darauf steht, sondern dass der Spieler weiss auf welchem Feld er steht
    // Feld-ID setzen für die Unterscheidung und Referenzierung der einzelnen Felder
    id = '';
    feldnummer = 0;
    #feldtext = '';
    // DOM-Element
    domElement = document.createElement('div');
    //Spielfeld
    #parentSpielfeld;
  
    // Instanzieren der Klasse
    constructor(spielfeld, id) {
      this.#parentSpielfeld = spielfeld;
      // this.id = 'feld'+id; --> nicht als String, ist schwieriger zu ändern / addieren
      this.id = 'feld'+id;
      this.feldnummer = id;
      this.#feldtext = id;
      // ID-Attribut auf div-Element setzen
      // alle Felder die nicht Start oder Ziel sind
      this.domElement.setAttribute('id', this.id);
      if (id != 0 && id != 99) {
        this.domElement.textContent = this.#feldtext;
      }
      // Startfeld 
      else if (id === 0) {
        this.domElement.textContent = 'Start';
      }
      // Zielfeld 
      else if (id === 99) {
        this.domElement.textContent = 'Ziel';
      }
    }
    // DOM-Element einer Klasse zuweisen
    NormalesFeldKlassieren() {
      this.domElement.setAttribute('class', 'normalesfeld')
    }
    LeiterfeldKlassieren() {
      this.domElement.setAttribute('class', 'leiterfeld');
    }
  
    AddToBoard(board) {
      board.appendChild(this.domElement);
    }
  
  }

  // Klasse Leiterfeld mit Vererbung instanzieren
  class Leiterfeld extends Feld {
    Zielfeld = '';

    constructor(spielfeld, id, zielfeld) {
      super(spielfeld, id);
      this.Zielfeld = zielfeld;
    }
  }
  
  // Mapping der Felder (von welchem Feld führt eine Leiter zu welchem Feld)
  const SPIELFELD_LEITERKONFIG = [
    {id: 5, zielfeld: 14},
    {id: 16, zielfeld: 36},
    {id: 22, zielfeld: 2},
    {id: 32, zielfeld: 12},
    {id: 34, zielfeld: 54},
    {id: 52, zielfeld: 87},
    {id: 59, zielfeld: 40},
    {id: 62, zielfeld: 82},
    {id: 90, zielfeld: 50},
    {id: 94, zielfeld: 74}
  ];