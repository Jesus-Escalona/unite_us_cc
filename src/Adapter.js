const url = process.env.REACT_APP_BACKEND_URL;
const headers = {
    "Content-Type": "application/json",
    "Accepts": "application/json",
    "Cache-Control": "no-cache"
};

class Adapter {
    constructor(url) {
        this.url = url
    }

    get(route) {
        return fetch(`${this.url}/${route}`)
    }

    post(route, token = '', obj) {
        return fetch(`${this.url}/${route}`, {
            method: "POST",
            headers,
            body: JSON.stringify(obj)
        })
            .then(resp => resp.json())
    }

    patch(route, token = '', obj) {
        return fetch(`${this.url}/${route}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Accepts': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        })
            .then(resp => resp.json())
    }
}

export const getData = new Adapter(url);
