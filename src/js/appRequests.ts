/**
 * Class responsible for connecting with API
 */
export class AppRequests {
    constructor() {}

    /**
     * Get all github repositories of the user by username request.
     * @param {string} userName 
     */
    getUserRepositories = (userName: string) => {
        return axios
            .get(`https://api.github.com/users/${userName}/repos`)
            .then((response: { data: any }) => response.data)
            .catch((error: any) => {
                console.log(error);
                return [];
            });
    };
}
