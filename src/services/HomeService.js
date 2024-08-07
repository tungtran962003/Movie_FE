import axios from "../utils/axiosCustomize"

const getListMovieHome = () => {
    return axios.get('/home')
}

export { getListMovieHome }