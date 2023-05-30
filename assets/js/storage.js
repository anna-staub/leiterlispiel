class StorageService {
    static set(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

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

function teilspielstandSpeichern(figurname, feld, wuerfel, zahl) {
    StorageService.set(figurname, feld);
    StorageService.set(wuerfel, zahl);
}