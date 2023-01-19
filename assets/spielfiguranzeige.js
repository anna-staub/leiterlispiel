class Spielfiguranzeige {
    // DOM-Element für Spielfiguranzeige
    #domElementSpielfiguranzeige = document.createElement('div');

    constructor(spiel) {
        this.spiel = spiel;
        // Class-Attribut und ID-Attribut auf DOM-Element setzen
        this.#domElementSpielfiguranzeige.setAttribute('class', 'spielfigur');
        this.#domElementSpielfiguranzeige.setAttribute('id', this.spiel.aktuelleSpielfigur.spielfigurname);
    }

    // Spielfigur in Spielfiguranzeige anzeigen
    spielfigurAnzeigen(){
        this.#domElementSpielfiguranzeige.setAttribute('id', this.spiel.aktuelleSpielfigur.spielfigurname);
        if (debug_mode) {console.log('Aktuelle Spielfigur: '+ this.#domElementSpielfiguranzeige.id);}
        document.getElementById('spielfiguranzeige').appendChild(this.#domElementSpielfiguranzeige);
    }
    // Spielfigur aus Spielfiguranzeige entfernen
    spielfigurAusAnzeigeEntfernen() {
        document.getElementById('spielfiguranzeige').removeChild(this.#domElementSpielfiguranzeige);
    }
}