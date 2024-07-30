import axios from "../utils/axiosCustomize"

const getAllRoom = (token) => {
    return axios.get('/api/room/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageRoom = (page, pageSize, cinemaId, token) => {
    debugger
    return axios.get(`/api/room/page?cinemaId=${cinemaId}&page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createRoom = (name, capacity, cinemaId, token) => {
    return axios.post('/api/room/create', { name, capacity, cinemaId }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateRoom = (idUpdate, name, capacity, cinemaId, token) => {
    return axios.put(`/api/room/update/${idUpdate}`, { name, capacity, cinemaId }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteRoom = (idDelete, token) => {
    return axios.delete(`/api/room/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllRoom, getPageRoom, createRoom, updateRoom, deleteRoom }