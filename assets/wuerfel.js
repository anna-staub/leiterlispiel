// Würfel als eigenes Objekt

// Ich bin nicht sicher, ob die Würfel-Funktion direkt dem Spieler als Methode gegeben werden sollte?
// Ich glaube auf jeden Fall, wir sollten nicht alle Funktionalitäten in ein Objekt Spielfeld packen.


class Wuerfel{
    constructor(augenzahl) {
        this.Augenzahl = augenzahl;
    }
    
    // Würfel-Methode
    wuerfeln() {
        let wuerfelergebnis = Math.ceil(Math.random()*this.Augenzahl);

        // Falls das Würfelergebnis 1-5 ist
        if (wuerfelergebnis < 6) {
            return wuerfelergebnis;
        }

        // Falls das Würfelergebnis 6 ist
        else if (wuerfelergebnis === 6) {
            console.log(wuerfelergebnis)
            console.log("Sie dürfen noch einmal!")
            return this.wuerfeln();
        }
    }
  };
  
  // Spielwürfel-Instanz erstellen
  spielwuerfel = new Wuerfel(6);