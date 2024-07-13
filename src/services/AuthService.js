import axios from "../utils/axiosCustomize";

const signup = (email, name, gender, birthDay, phoneNumber, password) => {
    return axios.post('/signup', { name, gender, email, password, phoneNumber, birthDay });
}

const login = (email, password, delay) => {
    return axios.post('/login', { email, password, delay })
}

const getPrincipal = (token) => {
    return axios.get('/principal', { headers: { "Authorization": `Bearer ${token}` } }, { token })
}

export { signup, login, getPrincipal }