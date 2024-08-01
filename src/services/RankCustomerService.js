import axios from "../utils/axiosCustomize"

const getAllRankCustomer = (token) => {
    return axios.get('/api/rankCustomer/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageRankCustomer = (page, pageSize, token) => {
    return axios.get(`/api/rankCustomer/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createRankCustomer = (name, address, hotline, token) => {
    return axios.post('/api/rankCustomer/create', { name, address, hotline }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateRankCustomer = (idUpdate, name, address, hotline, token) => {
    return axios.put(`/api/rankCustomer/update/${idUpdate}`, { name, address, hotline }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteRankCustomer = (idDelete, token) => {
    return axios.delete(`/api/rankCustomer/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export {
    getAllRankCustomer, getPageRankCustomer, createRankCustomer, updateRankCustomer, deleteRankCustomer,
}