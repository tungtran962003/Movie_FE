import { useState } from 'react'
import './MovieTypeAdmin.scss'
import TableMovieType from './TableMovieType'
import { getPageMovieType } from '../../../../services/MovieTypeService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateMovieType from './ModalCreateMovieType'
import ModalUpdateMovieType from './ModalUpdateMovieType'
import ModalDeleteMovieType from './ModalDeleteMovieType'

const MovieTypeAdmin = () => {

    const [listMovieType, setListMovieType] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 5;

    const getListMoiveTypePaginate = async (page) => {
        let response = await getPageMovieType(page, pageSize)
        setListMovieType(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateMovieType, setShowModalCreateMovieType] = useState(false)
    const [showModalUpdateMovieType, setShowModalUpdateMovieType] = useState(false)
    const [showModalDeleteMovieType, setShowModalDeleteMovieType] = useState(false)

    const handleClickUpdate = (movieUpdate) => {
        setShowModalUpdateMovieType(true)
        setDataUpdate(movieUpdate)
    }

    const handleClickDelete = (movieDelete) => {
        setShowModalDeleteMovieType(true)
        setDataDelete(movieDelete)
    }

    useEffect(() => {
        getListMoiveTypePaginate(0)
    }, [])

    return (
        <>
            <div className="movieType-container">
                <div className="title-manager">
                    Quản lý thể loại phim
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateMovieType(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableMovieType
                        listMovieType={listMovieType}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListMoiveTypePaginate={getListMoiveTypePaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateMovieType
                show={showModalCreateMovieType}
                setShow={setShowModalCreateMovieType}
                getListMoiveTypePaginate={getListMoiveTypePaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateMovieType
                show={showModalUpdateMovieType}
                setShow={setShowModalUpdateMovieType}
                dataUpdate={dataUpdate}
                getListMoiveTypePaginate={getListMoiveTypePaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteMovieType
                show={showModalDeleteMovieType}
                setShow={setShowModalDeleteMovieType}
                dataDelete={dataDelete}
                getListMoiveTypePaginate={getListMoiveTypePaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>

    )
}

export default MovieTypeAdmin