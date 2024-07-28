import { useState } from 'react'
import './CinemaAdmin.scss'
import TableCinema from './TableCinema'
import { getPageCinema, getPageRoomByCinema } from '../../../../services/CinemaService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateCinema from './ModalCreateCinema'
import ModalUpdateCinema from './ModalUpdateCinema'
import ModalDeleteCinema from './ModalDeleteCinema'
import { getCookie } from '../../../Auth/CookieManager'
import { useNavigate } from 'react-router-dom'

const CinemaAdmin = () => {

    const [listCinema, setListCinema] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const navigate = useNavigate()

    const getListCinemaPaginate = async (page) => {
        let response = await getPageCinema(page, pageSize, token)
        setListCinema(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateCinema, setShowModalCreateCinema] = useState(false)
    const [showModalUpdateCinema, setShowModalUpdateCinema] = useState(false)
    const [showModalDeleteCinema, setShowModalDeleteCinema] = useState(false)

    const handleClickUpdate = (cinemaUpdate) => {
        setShowModalUpdateCinema(true)
        setDataUpdate(cinemaUpdate)
    }

    const handleClickDelete = (cinemaDelete) => {
        setShowModalDeleteCinema(true)
        setDataDelete(cinemaDelete)
    }

    useEffect(() => {
        getListCinemaPaginate(0)
    }, [])

    return (
        <>
            <div className="cinema-container">
                <div className="title-manager">
                    Quản lý rạp chiếu phim
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateCinema(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableCinema
                        listCinema={listCinema}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListCinemaPaginate={getListCinemaPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateCinema
                show={showModalCreateCinema}
                setShow={setShowModalCreateCinema}
                getListCinemaPaginate={getListCinemaPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateCinema
                show={showModalUpdateCinema}
                setShow={setShowModalUpdateCinema}
                dataUpdate={dataUpdate}
                getListCinemaPaginate={getListCinemaPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteCinema
                show={showModalDeleteCinema}
                setShow={setShowModalDeleteCinema}
                dataDelete={dataDelete}
                getListCinemaPaginate={getListCinemaPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default CinemaAdmin