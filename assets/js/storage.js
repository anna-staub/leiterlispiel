class StorageService {
    // Grundfunktion, um Werte in SessionStorage zu speichern
    static set(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    // Grundfunktion, um im SessionStorage gespeicherte Werte auszulesen
    static get(key) {
        let result = null;
        if (sessionStorage.getItem(key)) {
            result = JSON.parse(sessionStorage.getItem(key));
        }
        return result;
    }
}

function spielstandSpeichern(figurname, feld, wuerfel, zahl, aktuellerSpieler) {
    StorageService.set(figurname, feld);
    StorageService.set(wuerfel, zahl);
    StorageService.set(aktuellerSpieler, figurname);
}

// Spielstand ohne aktuellerSpieler speichern (wird für Tausch benötigt)
function teilspielstandSpeichern(figurname, feld, wuerfel, zahl) {
    StorageService.set(figurname, feld);
    StorageService.set(wuerfel, zahl);
}