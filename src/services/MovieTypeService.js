import axios from "../utils/axiosCustomize"

const getAllMovieType = (token) => {
    return axios.get('/api/movieType/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageMovieType = (page, pageSize, token) => {
    return axios.get(`/api/movieType/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createMovieType = (name, token) => {
    const data = new FormData()
    data.append('name', name)
    return axios.post('/api/movieType/create', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateMovieType = (idUpdate, name, token) => {
    const data = new FormData()
    data.append('idUpdate', idUpdate)
    data.append('name', name)
    return axios.put('/api/movieType/update', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteMovieType = (idDelete, token) => {
    return axios.delete(`/api/movieType/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllMovieType, getPageMovieType, createMovieType, updateMovieType, deleteMovieType }