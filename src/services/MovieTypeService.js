import axios from "../utils/axiosCustomize"

const getAllMovieType = () => {
    return axios.get('/api/movieType/all')
}

const getPageMovieType = (page, pageSize, token) => {
    return axios.get(`/api/movieType/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createMovieType = (name) => {
    const data = new FormData()
    data.append('name', name)
    return axios.post('/api/movieType/create', data)
}

const updateMovieType = (idUpdate, name) => {
    const data = new FormData()
    data.append('idUpdate', idUpdate)
    data.append('name', name)
    return axios.put('/api/movieType/update', data)
}

const deleteMovieType = (idDelete) => {
    return axios.delete(`/api/movieType/delete/${idDelete}`)
}

export { getAllMovieType, getPageMovieType, createMovieType, updateMovieType, deleteMovieType }