import remoteServer from "./RemoteServer";

export default class ClassRoomService {

    /**
     * Get запрос
     */
    static async getAll() {
        return (await remoteServer.get("users")).data;
    }

    /**
     * Post request должен быть !
     */
    static async createUser(name) {
        let response = (await remoteServer.post("users", {name: name}));
        return response.status;
    }

    /**
     * Remove request должен быть !
     */
    static async removeById(id) {
        return (await remoteServer.delete('users/' + id)).status;
    }

}