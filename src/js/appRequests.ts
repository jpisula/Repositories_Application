export class AppRequests {
    constructor(){

    }

    getUserRepositories = (userName: string) => {
        return axios.get(`https://api.github.com/users/${userName}/repos`)
            .then(response => response.data);
    }
}