import axios from "../utils/axiosCustomize";

const signup = () => {
    const data = new FormData()
    data.append('/')
    return axios.post("/signup")
}

// const 