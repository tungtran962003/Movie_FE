import { useState } from 'react'
import './SeatTypeAdmin.scss'
import TableSeatType from './TableSeatType'
import { getPageSeatType } from '../../../../services/SeatTypeService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateSeatType from './ModalCreateSeatType'
import ModalUpdateSeatType from './ModalUpdateSeatType'
import ModalDeleteSeatType from './ModalDeleteSeatType'
import { getCookie } from '../../../Auth/CookieManager'

const SeatTypeAdmin = () => {

    const [listSeatType, setListSeatType] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const getListSeatTypePaginate = async (page) => {
        let response = await getPageSeatType(page, pageSize, token)
        setListSeatType(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateSeatType, setShowModalCreateSeatType] = useState(false)
    const [showModalUpdateSeatType, setShowModalUpdateSeatType] = useState(false)
    const [showModalDeleteSeatType, setShowModalDeleteSeatType] = useState(false)

    const handleClickUpdate = (seatTypeUpdate) => {
        setShowModalUpdateSeatType(true)
        setDataUpdate(seatTypeUpdate)
    }

    const handleClickDelete = (seatTypeDelete) => {
        setShowModalDeleteSeatType(true)
        setDataDelete(seatTypeDelete)
    }

    useEffect(() => {
        getListSeatTypePaginate(0)
    }, [])

    return (
        <>
            <div className="seatType-container">
                <div className="title-manager">
                    Quản lý loại ghế
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateSeatType(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableSeatType
                        listSeatType={listSeatType}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListSeatTypePaginate={getListSeatTypePaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateSeatType
                show={showModalCreateSeatType}
                setShow={setShowModalCreateSeatType}
                getListSeatTypePaginate={getListSeatTypePaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateSeatType
                show={showModalUpdateSeatType}
                setShow={setShowModalUpdateSeatType}
                dataUpdate={dataUpdate}
                getListSeatTypePaginate={getListSeatTypePaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteSeatType
                show={showModalDeleteSeatType}
                setShow={setShowModalDeleteSeatType}
                dataDelete={dataDelete}
                getListSeatTypePaginate={getListSeatTypePaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default SeatTypeAdmin