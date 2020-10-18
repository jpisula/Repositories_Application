export class AppRequests {
    constructor() {
        this.getUserRepositories = (userName) => {
            return axios
                .get(`https://api.github.com/users/${userName}/repos`)
                .then((response) => response.data);
        };
    }
}
