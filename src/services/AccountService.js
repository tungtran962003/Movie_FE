import axios from "../utils/axiosCustomize"

const getAllAccount = (token) => {
    return axios.get('/api/account/all', { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageAccount = (page, pageSize, token) => {
    return axios.get(`/api/account/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createAccount = (name, email, password, gender, birthDay, phoneNumber, file, rankCustomerId, roleId, token) => {
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('gender', gender)
    data.append('password', password)
    data.append('birthDay', birthDay)
    data.append('phoneNumber', phoneNumber)
    data.append('file', file)
    data.append('rankCustomerId', rankCustomerId)
    data.append('roleId', roleId)
    return axios.post('/api/account/create', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateAccount = (idUpdate, name, email, password, gender, birthDay, phoneNumber, file, rankCustomerId, roleId, token) => {
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('gender', gender)
    data.append('password', password)
    data.append('birthDay', birthDay)
    data.append('phoneNumber', phoneNumber)
    data.append('file', file)
    data.append('rankCustomerId', rankCustomerId)
    data.append('roleId', roleId)
    return axios.put(`/api/account/update/${idUpdate}`, data, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteAccount = (idDelete, token) => {
    return axios.delete(`/api/account/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export {
    getAllAccount, getPageAccount, createAccount, updateAccount, deleteAccount,
}