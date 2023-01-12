class Wuerfel{
    constructor(augenzahl) {
        this.Augenzahl = Number(augenzahl);
    }
    // Würfel-Methode
    wuerfeln() {
        let wuerfelergebnis = Math.ceil(Math.random()*this.Augenzahl);

        wuerfelergebnis = parseInt(wuerfelergebnis);
        console.log('Würfelergebnis: '+wuerfelergebnis);

        // eigene Methode dafür erstellen
        document.getElementById("wuerfelanzeige").innerHTML = String('Zuletzt gewürfelte Zahl: <br>\ '+wuerfelergebnis);
        return wuerfelergebnis;
    };
}