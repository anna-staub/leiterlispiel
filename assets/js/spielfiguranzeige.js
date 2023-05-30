class Spielfiguranzeige {
    // DOM-Element für Spielfiguranzeige
    #domElementSpielfiguranzeige = document.createElement('div');

    constructor(spiel) {
        this.spiel = spiel;
        // Class-Attribut und ID-Attribut auf DOM-Element setzen
        this.#domElementSpielfiguranzeige.setAttribute('class', 'spielfigur');
        this.#domElementSpielfiguranzeige.setAttribute('id', this.spiel.aktuelleSpielfigur.spielfigurname);
    }

    // Spielfigur und Spielername in Spielfiguranzeige anzeigen + ausgewählte Farben und angegebene Namen übergeben
    spielfigurAnzeigen(){
        this.#domElementSpielfiguranzeige.setAttribute('id', this.spiel.aktuelleSpielfigur.spielfigurname);
        if (debug_modus) {console.log('Aktuelle Spielfigur: '+ this.#domElementSpielfiguranzeige.id);}
        this.#domElementSpielfiguranzeige.setAttribute('style', 'background-color:'+this.spiel.aktuelleSpielfigur.spielfigurfarbe);
        document.getElementById('spielfiguranzeige').innerHTML = this.spiel.aktuelleSpielfigur.spielername;
        document.getElementById('spielfiguranzeige').appendChild(this.#domElementSpielfiguranzeige);
    }
    // Spielfigur aus Spielfiguranzeige entfernen
    spielfigurAusAnzeigeEntfernen() {
        document.getElementById('spielfiguranzeige').removeChild(this.#domElementSpielfiguranzeige);
    }
}