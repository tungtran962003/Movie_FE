import { useState } from 'react'
import './SeatStatusAdmin.scss'
import TableSeatStatus from './TableSeatStatus'
import { getPageSeatStatus } from '../../../../services/SeatStatusService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateSeatStatus from './ModalCreateSeatStatus'
import ModalUpdateSeatStatus from './ModalUpdateSeatStatus'
import ModalDeleteSeatStatus from './ModalDeleteSeatStatus'
import { getCookie } from '../../../Auth/CookieManager'

const SeatStatusAdmin = () => {

    const [listSeatStatus, setListSeatStatus] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const getListSeatStatusPaginate = async (page) => {
        let response = await getPageSeatStatus(page, pageSize, token)
        setListSeatStatus(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateSeatStatus, setShowModalCreateSeatStatus] = useState(false)
    const [showModalUpdateSeatStatus, setShowModalUpdateSeatStatus] = useState(false)
    const [showModalDeleteSeatStatus, setShowModalDeleteSeatStatus] = useState(false)

    const handleClickUpdate = (seatStatusUpdate) => {
        setShowModalUpdateSeatStatus(true)
        setDataUpdate(seatStatusUpdate)
    }

    const handleClickDelete = (seatStatusDelete) => {
        setShowModalDeleteSeatStatus(true)
        setDataDelete(seatStatusDelete)
    }

    useEffect(() => {
        getListSeatStatusPaginate(0)
    }, [])

    return (
        <>
            <div className="seatStatus-container">
                <div className="title-manager">
                    Quản lý trạng thái ghế
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateSeatStatus(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableSeatStatus
                        listSeatStatus={listSeatStatus}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListSeatStatusPaginate={getListSeatStatusPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateSeatStatus
                show={showModalCreateSeatStatus}
                setShow={setShowModalCreateSeatStatus}
                getListSeatStatusPaginate={getListSeatStatusPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateSeatStatus
                show={showModalUpdateSeatStatus}
                setShow={setShowModalUpdateSeatStatus}
                dataUpdate={dataUpdate}
                getListSeatStatusPaginate={getListSeatStatusPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteSeatStatus
                show={showModalDeleteSeatStatus}
                setShow={setShowModalDeleteSeatStatus}
                dataDelete={dataDelete}
                getListSeatStatusPaginate={getListSeatStatusPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default SeatStatusAdmin