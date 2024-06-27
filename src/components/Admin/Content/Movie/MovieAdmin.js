import { useState } from 'react'
import './MovieAdmin.scss'
import TableMovie from './TableMovie'
import { getPageMovie } from '../../../../services/MovieService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalMovie from './ModalMovie'

const MovieAdmin = () => {

    const [listMovie, setListMovie] = useState([])

    const getListMoivePaginate = async () => {
        let response = await getPageMovie()
        setListMovie(response.data)
    }

    const [showModalMovie, setShowModalMovie] = useState(false)

    useEffect(() => {
        getListMoivePaginate()
    }, [])

    return (
        <>
            <div className="movie-container">
                <div className="title-manager">
                    Quản lý phim
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalMovie(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableMovie
                        listMovie={listMovie}
                        getListMoivePaginate={getListMoivePaginate}
                    />
                </div>
            </div>

            <ModalMovie
                show={showModalMovie}
                setShow={setShowModalMovie}
            />
        </>

    )
}

export default MovieAdmin