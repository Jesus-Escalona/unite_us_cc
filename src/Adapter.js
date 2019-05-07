const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:49567/api';

class Adapter {
    constructor(url) {
        this.url = url
    }

    get(route) {
        return fetch(`${this.url}/${route}`)
    }

    post(route, obj) {
        return fetch(`${this.url}/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    }
}

export const getData = new Adapter(url);
