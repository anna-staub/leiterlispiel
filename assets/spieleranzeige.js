class Spieleranzeige {
    // DOM-Element für Spieleranzeige
    domElementSpieleranzeige = document.createElement('div');

    constructor(spiel) {
        this.spiel = spiel;
        // Class-Attribut und ID-Attribut auf DOM-Element setzen
        this.domElementSpieleranzeige.setAttribute('class', 'spieler');
        this.domElementSpieleranzeige.setAttribute('id', this.spiel.aktuellerSpieler.spielername); // momentan wird immer nur spieler1 dargestellt
    }

    // Spieler in Spieleranzeige anzeigen
    spielerAnzeigen(){
        console.log('Aktueller Spieler: '+ this.domElementSpieleranzeige.id);
        document.getElementById('spieleranzeige').appendChild(this.domElementSpieleranzeige);
    }
    // Spieler aus Spieleranzeige entfernen
    spielerAusAnzeigeEntfernen() {
        document.getElementById('spieleranzeige').removeChild(this.domElementSpieleranzeige);
    }
}