class StorageService {
    static set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static get(key) {
        let result = null;
        if (localStorage.getItem(key)) {
            result = JSON.parse(localStorage.getItem(key));
        }
        return result;
    }
}