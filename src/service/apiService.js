import { getApi } from "../utils/axios"


const uploadFile = async(payload) => {
    const respose = await getApi().post('/prediction', payload);
    return respose;
}

export {
    uploadFile
}