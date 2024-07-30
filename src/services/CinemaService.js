import axios from "../utils/axiosCustomize"

const getAllCinema = (token) => {
    return axios.get('/api/cinema/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageCinema = (page, pageSize, token) => {
    return axios.get(`/api/cinema/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createCinema = (name, address, hotline, token) => {
    return axios.post('/api/cinema/create', { name, address, hotline }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateCinema = (idUpdate, name, address, hotline, token) => {
    return axios.put(`/api/cinema/update/${idUpdate}`, { name, address, hotline }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteCinema = (idDelete, token) => {
    return axios.delete(`/api/cinema/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export {
    getAllCinema, getPageCinema, createCinema, updateCinema, deleteCinema,
}