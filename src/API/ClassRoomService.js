import remoteServer from "./RemoteServer";

/**
 * https://highload.today/metody-http-zaprosov/
 */
export default class ClassRoomService {

    static async getAll() {
        let response = (await remoteServer.get("users/"));
        return response.data;
    }


    static async createUser(user) {
        console.log("CRETED USER ")
        let response = (await remoteServer.post("users/", user));
        console.log("---------------------------------> next")
        return response;
    }

    static async removeById(id) {
        let response = (await remoteServer.delete("users/" + id));
        return response.status;
    }


    static async riseHand(user) {
        let response = (await remoteServer.put("users/", user));
        return response.status;
    }

}