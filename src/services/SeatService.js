import axios from "../utils/axiosCustomize"

const getAllSeat = (token) => {
    return axios.get('/api/seat/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageSeat = (page, pageSize, token) => {
    return axios.get(`/api/seat/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createSeat = (name, token) => {
    const data = new FormData()
    data.append('name', name)
    return axios.post('/api/seat/create', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateSeat = (idUpdate, name, token) => {
    const data = new FormData()
    data.append('idUpdate', idUpdate)
    data.append('name', name)
    return axios.put('/api/seat/update', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteSeat = (idDelete, token) => {
    return axios.delete(`/api/seat/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllSeat, getPageSeat, createSeat, updateSeat, deleteSeat }