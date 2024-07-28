import axios from "../utils/axiosCustomize"

const getAllSeatType = (token) => {
    return axios.get('/api/seatType/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageSeatType = (page, pageSize, token) => {
    return axios.get(`/api/seatType/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createSeatType = (name, price, token) => {
    const data = new FormData()
    data.append('name', name)
    data.append('price', price)
    return axios.post('/api/seatType/create', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateSeatType = (idUpdate, name, price, token) => {
    const data = new FormData()
    data.append('idUpdate', idUpdate)
    data.append('name', name)
    data.append('price', price)
    return axios.put('/api/seatType/update', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteSeatType = (idDelete, token) => {
    return axios.delete(`/api/seatType/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllSeatType, getPageSeatType, createSeatType, updateSeatType, deleteSeatType }