import axios from "../utils/axiosCustomize"

const getAllTicket = (token) => {
    return axios.get('/api/ticket/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageTicket = (page, pageSize, token) => {
    return axios.get(`/api/ticket/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createTicket = (name, capacity, cinemaId, token) => {
    return axios.post('/api/ticket/create', { name, capacity, cinemaId }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateTicket = (idUpdate, name, capacity, cinemaId, token) => {
    return axios.put(`/api/ticket/update/${idUpdate}`, { name, capacity, cinemaId }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteTicket = (idDelete, token) => {
    return axios.delete(`/api/ticket/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllTicket, getPageTicket, createTicket, updateTicket, deleteTicket }