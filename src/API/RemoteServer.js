import axios from "axios";

export default axios.create({
    baseURL:'http://localhost:8080/'
})

export const WS_CROSS_ORIGIN = 'http://localhost:8080/ws';

