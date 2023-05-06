import { setHeaderToken } from "./setHeaderToken";


export const checkAuthToken = () => {
    
    // first, get token
    let jwtToken = localStorage.getItem('jwtToken');
    // if token exists, then:
    if (jwtToken) {
        //set isAuth to true
        setHeaderToken(jwtToken)
        return true
    } else {
        //else, set isAuth to false
        return false
    }
}