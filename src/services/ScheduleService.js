import axios from "../utils/axiosCustomize"

const getAllSchedule = (token) => {
    return axios.get('/api/schedule/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageSchedule = (page, pageSize, token) => {
    return axios.get(`/api/schedule/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createSchedule = (name, capacity, cinemaId, token) => {
    return axios.post('/api/schedule/create', { name, capacity, cinemaId }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateSchedule = (idUpdate, name, capacity, cinemaId, token) => {
    return axios.put(`/api/schedule/update/${idUpdate}`, { name, capacity, cinemaId }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteSchedule = (idDelete, token) => {
    return axios.delete(`/api/schedule/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllSchedule, getPageSchedule, createSchedule, updateSchedule, deleteSchedule }