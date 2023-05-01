// Wert aus Namensfeld1 in SessionStorage speichern
let name1 = document.getElementById('name1');
name1.addEventListener('change', () => {
    StorageService.set('name1', name1.value);
});

// Wert aus Namensfeld2 in SessionStorage speichern
let name2 = document.getElementById('name2');
name2.addEventListener('change', () => {
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