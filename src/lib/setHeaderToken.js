import Axios from "./Axios";

export const setHeaderToken = (token) => {
    
    // if there is a token
    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        // on logout, clear headers
        delete Axios.defaults.headers.common["Authorization"]
    }
}