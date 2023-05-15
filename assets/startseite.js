// Wert aus Namensfeld1 in SessionStorage speichern
let name1 = document.getElementById('name1');
name1.addEventListener('input', () => {
    StorageService.set('name1', name1.value);
});

// Wert aus Namensfeld2 in SessionStorage speichern
let name2 = document.getElementById('name2');
name2.addEventListener('input', () => {
    StorageService.set('name2', name2.value);
});

// Wert aus Selektor1 in SessionStorage speichern
let selektor1 = document.getElementById('selektor1');
selektor1.addEventListener('change', () => {
    StorageService.set('farbe1', selektor1.value);
});

// Wert aus Selektor2 in SessionStorage speichern
let selektor2 = document.getElementById('selektor2');
selektor2.addEventListener('change', () => {
    StorageService.set('farbe2', selektor2.value);
});

function disableSpielstart() {
    document.getElementById('spielstarten').setAttribute('disabled', '');
}

function enableSpielstart() {
    document.getElementById('spielstarten').removeAttribute('disabled');
}

function eingabenPruefen(form) {
    form.action ='';
    if (selektor1.value === 'leer' | selektor2.value === 'leer' | selektor1.value === selektor2.value | name1.value === '' | name2.value === '' | name1.value === name2.value) {
        window.alert('ACHTUNG! \nDie Namen und Farben der Spieler*innen dürfen weder leer noch identisch sein. Bitte korrigiert eure Eingaben.');
    }
    else {
        form.action='spiel.html';
    }
    return false;
}   