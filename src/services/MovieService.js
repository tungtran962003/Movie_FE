import axios from "../utils/axiosCustomize"

const getAllMovie = () => {
    return axios.get('/api/movie/all')
}

const getPageMovie = (page, pageSize, token) => {
    return axios.get(`/api/movie/page?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageMovieIsShowing = (page, pageSize, token) => {
    return axios.get(`/api/movie/isShowing?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const getPageUpComingMovie = (page, pageSize, token) => {
    return axios.get(`/api/movie/upComing?page=${page}&pageSize=${pageSize}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const createMovie = (name, time, premiereDate, description, director, language, performer, movieTypeId, trailer, file, token) => {
    const data = new FormData()
    data.append('name', name)
    data.append('time', time)
    data.append('premiereDate', premiereDate)
    data.append('description', description)
    data.append('director', director)
    data.append('language', language)
    data.append('performer', performer)
    data.append('movieTypeId', movieTypeId)
    data.append('trailer', trailer)
    data.append('file', file)
    return axios.post('/api/movie/create', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const updateMovie = (idUpdate, name, time, premiereDate, description, director, language, performer, movieTypeId, trailer, file, token) => {
    const data = new FormData()
    data.append('idUpdate', idUpdate)
    data.append('name', name)
    data.append('time', time)
    data.append('premiereDate', premiereDate)
    data.append('description', description)
    data.append('director', director)
    data.append('language', language)
    data.append('performer', performer)
    data.append('movieTypeId', movieTypeId)
    data.append('trailer', trailer)
    data.append('file', file === '' ? null : file)
    return axios.put(`/api/movie/update`,
        data,
        { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteMovie = (idDelete, token) => {
    return axios.delete(`/api/movie/delete/${idDelete}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const searchMovie = (page, pageSize, name, startDate, endDate, director, language, performer, movieTypeId, token) => {
    return axios.get(`api/movie/search?page=${page}&pageSize=1${pageSize}&name=${name}
        &startDate=${startDate}&endDate=${endDate}&language=${language}&director=${director}
        &performer=${performer}&movieTypeId=${movieTypeId}`,
        { headers: { "Authorization": `Bearer ${token}` } }
    )
}

export {
    getAllMovie, getPageMovie, createMovie, updateMovie, deleteMovie, getPageMovieIsShowing, getPageUpComingMovie,
    searchMovie
}