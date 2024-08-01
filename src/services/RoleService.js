import axios from "../utils/axiosCustomize"

const getAllRole = (token) => {
    return axios.get('/api/role/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageRole = (page, pageSize, token) => {
    return axios.get(`/api/role/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createRole = (name, address, hotline, token) => {
    return axios.post('/api/role/create', { name, address, hotline }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateRole = (idUpdate, name, address, hotline, token) => {
    return axios.put(`/api/role/update/${idUpdate}`, { name, address, hotline }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteRole = (idDelete, token) => {
    return axios.delete(`/api/role/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export {
    getAllRole, getPageRole, createRole, updateRole, deleteRole,
}