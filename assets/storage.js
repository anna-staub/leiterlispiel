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