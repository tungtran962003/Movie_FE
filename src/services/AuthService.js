import axios from "../utils/axiosCustomize";

const signup = (email, name, gender, birthDay, phoneNumber, password) => {
    return axios.post('/signup', { name, gender, email, password, phoneNumber, birthDay });
}

const login = (email, password, delay) => {
    return axios.post('/login', { email, password, delay })
}

export { signup, login }