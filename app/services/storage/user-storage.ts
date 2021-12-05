import LocalStorage from "./storage"
import { loginKey } from "./storage-config"


export const getLoggedInUser = async () => {
    return await LocalStorage.getData(loginKey);
}

export const setLoggedInUser = async (user: number) => {
    return await LocalStorage.storeData(loginKey, user);
}