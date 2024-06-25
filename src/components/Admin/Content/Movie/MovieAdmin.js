import { useState } from 'react'
import './MovieAdmin.scss'
import TableMovie from './TableMovie'
import { getPageMovie } from '../../../../services/MovieService'
import { useEffect } from 'react'

const MovieAdmin = () => {

    const [listMovie, setListMovie] = useState([])

    const getListMoivePaginate = async () => {
        let response = await getPageMovie()
        console.log('check response ', response.data);
        setListMovie(response.data)
    }

    useEffect(() => {
        getListMoivePaginate()
    }, [])

    return (
        <div className="movie-container">
            <div className="title-manager">
                Quản lý phim
            </div>
            <div className="content-manager">
                <div className="border-btn">
                    <button className="btn-add">Tạo mới</button>
                </div>
            </div>
            <div>
                <TableMovie
                    listMovie={listMovie}
                    getListMoivePaginate={getListMoivePaginate}
                />
            </div>
        </div>
    )
}

export default MovieAdmin