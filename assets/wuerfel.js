class Wuerfel{
    constructor(augenzahl) {
        this.Augenzahl = Number(augenzahl);
    }
    // Würfel-Methode
    wuerfeln() {
        let wuerfelergebnis = Math.ceil(Math.random()*this.Augenzahl);
        wuerfelergebnis = parseInt(wuerfelergebnis);
        if (debug_mode) {console.log('Würfelergebnis: '+wuerfelergebnis);}
        return wuerfelergebnis;
    };

    wuerfelergebnisAusgeben(zahl) {
        document.getElementById("wuerfelanzeige").innerHTML = String('Zuletzt gewürfelte Zahl: <br>\ '+zahl);
    }
}

