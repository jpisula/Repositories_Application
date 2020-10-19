/**
 * Class responsible for connecting with API
 */
export class AppRequests {
    constructor() {
        /**
         * Get all github repositories of the user by username request.
         * @param {string} userName
         */
        this.getUserRepositories = (userName) => {
            return axios
                .get(`https://api.github.com/users/${userName}/repos`)
                .then((response) => response.data)
                .catch((error) => {
                console.log(error);
                return [];
            });
        };
    }
}
