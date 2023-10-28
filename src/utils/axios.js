import axios from "axios";

const getApi = () => {
    return axios.create({
        baseURL: 'http://192.168.8.109:8000',
        headers: {
            "Content-type": "multipart/form-data",
        }
    });
}

export {
    getApi
}