class Wuerfel{
    constructor(augenzahl) {
        this.Augenzahl = Number(augenzahl);
        console.log(this.Augenzahl);
    }
    // Würfel-Methode
    wuerfeln() {
        this.Augenzahl=6; // why?! Funktioniert bis jetzt nur so...

        let wuerfelergebnis = Math.ceil(Math.random()*this.Augenzahl);

        wuerfelergebnis = parseInt(wuerfelergebnis);
        console.log(wuerfelergebnis);

        document.getElementById("wuerfelanzeige").innerHTML = String(wuerfelergebnis);
        return wuerfelergebnis;
    };
}