import axios from "../utils/axiosCustomize"

const getAllVoucher = (token) => {
    return axios.get('/api/voucher/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageVoucher = (page, pageSize, token) => {
    return axios.get(`/api/voucher/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createVoucher = (name, quantity, minimumPrice, startDate, endDate, token) => {
    return axios.post('/api/voucher/create', { name, quantity, minimumPrice, startDate, endDate }, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateVoucher = (idUpdate, name, quantity, minimumPrice, startDate, endDate, token) => {
    return axios.put(`/api/voucher/update/${idUpdate}`, { name, quantity, minimumPrice, startDate, endDate }, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteVoucher = (idDelete, token) => {
    return axios.delete(`/api/voucher/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { getAllVoucher, getPageVoucher, createVoucher, updateVoucher, deleteVoucher }