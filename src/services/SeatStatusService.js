import axios from "../utils/axiosCustomize"

const getAllSeatStatus = () => {
    return axios.get('/api/seatStatus/all')
}

const getPageSeatStatus = (page, pageSize, token) => {
    return axios.get(`/api/seatStatus/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createSeatStatus = (name, token) => {
    const data = new FormData()
    data.append('name', name)
    return axios.post('/api/seatStatus/create', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateSeatStatus = (idUpdate, name, token) => {
    const data = new FormData()
    data.append('idUpdate', idUpdate)
    data.append('name', name)
    return axios.put('/api/seatStatus/update', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteSeatStatus = (idDelete, token) => {
    return axios.delete(`/api/seatStatus/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllSeatStatus, getPageSeatStatus, createSeatStatus, updateSeatStatus, deleteSeatStatus }