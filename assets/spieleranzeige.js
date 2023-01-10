class Spieleranzeige {
    // DOM-Element für Spieleranzeige
    domElementSpieleranzeige = document.createElement('div');
    
    // Spieler in Spieleranzeige anzeigen
    spielerAnzeigen(){
        console.log('Aktueller Spieler: '+this.domElementSpieleranzeige.id);
        document.getElementById('spieleranzeige').appendChild(this.domElementSpieleranzeige);
    }
    // Spieler aus Spieleranzeige entfernen
    spielerAusAnzeigeEntfernen() {
        document.getElementById('spieleranzeige').removeChild(this.domElementSpieleranzeige);
    }
}