class API {
    static #baseURL= 'https://343505-29.web.fhgr.ch/api/leiterlispiel/';
    static GET(name, id = null) {
        return fetch(`${this.#baseURL}${name}${id ? '/' + id: ''}`)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    }

    static POST(name, data) {
        return this.#postput(name, data, 'POST');
    }

    static PUT(name, data) {
        return this.#postput(name, data, 'PUT');
    }

    static #postput(name, data, method) {
        return fetch(this.#baseURL + name, {
            method: method,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }
    
    static DELETE(name, id) {
        return fetch(`${this.#baseURL}${name}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    }
}