const url = `https://localhost:44377/api`;
var requestOptions = {
    redirect: 'follow'
};

export const API = {
    async createInvestment(data, user) {
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify(data);
        requestOptions.headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + user.token
        }
        return await fetch(`${url}/Investments/Create`, requestOptions)
            .then(res => res.json());
    },
    async getAllInvestments(user) {
        requestOptions.method = 'GET';
        requestOptions.headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + user.token
        }
        return await fetch(`${url}/Investments/GetAll`, requestOptions)
            .then(res => res.json());
    },
    async closeInvestment(data, user) {
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify(data);
        requestOptions.headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + user.token
        }
        return await fetch(`${url}/Investments/Close`, requestOptions)
            .then(res => res.json());
    },
    async updateUser(data, user) {
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify(data);
        requestOptions.headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + user.token
        }
        return await fetch(`${url}/Authentication/UpdateDetails`, requestOptions)
            .then(res => res.json());
    }
};