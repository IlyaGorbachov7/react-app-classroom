import remoteServer from "./RemoteServer";

/**
 * https://highload.today/metody-http-zaprosov/
 */
export default class ClassRoomService {

    static async getAll() {
        let response = (await remoteServer.get(""));
        return response.data;
    }


    static async createUser(name) {
        let response = (await remoteServer.post("users/", {name: name}));
        // НУжно получить ОТВЕТ id созданного пользователя, так как id генерируется на сервере
        return response;
    }

    static async removeById(id) {
        let response = (await remoteServer.delete("users/" + id));
        return response.status;
    }


    static async riseHand(id, bulValue) {
        let response = (await remoteServer.put("users/", {id: id, isHand: bulValue}));
        return response.status;
    }

}