import axios from '../utils/axiosCustomize'

const getPageMovie = () => {
    return axios.get('/api/movie/page')
}

export { getPageMovie }