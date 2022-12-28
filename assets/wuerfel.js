// Würfel als eigenes Objekt

// Ich bin nicht sicher, ob die Würfel-Funktion direkt dem Spieler als Methode gegeben werden sollte?
// Ich glaube auf jeden Fall, wir sollten nicht alle Funktionalitäten in ein Objekt Spielfeld packen.

//event-Listener bei click auf Würfel-Feld gehört wo hin?


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
/* Ich glaube das dürfen wir nicht im Würfel integrieren
sondern der Spieler braucht vor zugBeenden eine Funktion die das 
Würfelergebnis nochmals überprüft und wenn es eine 6 war, wird einfach der ganze
Spielzug nochmals ausgeführt


        // Falls das Würfelergebnis 6 ist
        else if (wuerfelergebnis === 6) {
            console.log(wuerfelergebnis)
            console.log("Sie dürfen noch einmal!")
            return this.wuerfeln();
        }
*/
        document.getElementById('wuerfelanzeige').innerHTML = wuerfelergebnis;
    }
  };
  
  // Spielwürfel-Instanz erstellen
  const SPIELWUERFEL = new Wuerfel(6);