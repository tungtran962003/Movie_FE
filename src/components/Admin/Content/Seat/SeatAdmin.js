import { useState } from 'react'
import './SeatAdmin.scss'
import TableSeat from './TableSeat'
import { getPageSeat } from '../../../../services/SeatService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateSeat from './ModalCreateSeat'
import ModalUpdateSeat from './ModalUpdateSeat'
import ModalDeleteSeat from './ModalDeleteSeat'
import { getCookie } from '../../../Auth/CookieManager'
import { useLocation, useParams } from 'react-router-dom'
import ListSeat from './ListSeat'

const SeatAdmin = () => {

    const [listSeat, setListSeat] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const length = 100;

    const token = getCookie('cookie')

    const params = useParams()

    const location = useLocation()

    const room = location?.state?.room

    const [horizontal, setHorizontal] = useState('')

    const [vertical, setVertical] = useState('')

    // const getListSeatPaginate = async (page) => {
    //     let response = await getPageSeat(page, pageSize, token)
    //     setListSeat(response.content)
    //     setPageCount(response.totalPages)
    // }

    const [showModalCreateSeat, setShowModalCreateSeat] = useState(false)
    const [showModalUpdateSeat, setShowModalUpdateSeat] = useState(false)
    const [showModalDeleteSeat, setShowModalDeleteSeat] = useState(false)

    const handleClickUpdate = (seatUpdate) => {
        setShowModalUpdateSeat(true)
        setDataUpdate(seatUpdate)
    }

    const handleClickDelete = (seatDelete) => {
        setShowModalDeleteSeat(true)
        setDataDelete(seatDelete)
    }

    // useEffect(() => {
    //     getListSeatPaginate(0)
    // }, [])

    return (
        <>
            <div className="seat-container">
                <div className="title-manager">
                    Ghế trong phòng {room?.name}
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateSeat(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                {/* <div>
                    <TableSeat
                        listSeat={listSeat}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListSeatPaginate={getListSeatPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div> */}
                <div className='border-display'>
                    <div className='display-container'>
                        Màn hình
                    </div>
                </div>
                <ListSeat
                    listSeat={listSeat}
                    setListSeat={setListSeat}
                    vertical={vertical}
                    horizontal={horizontal}
                />
            </div>

            <ModalCreateSeat
                show={showModalCreateSeat}
                setShow={setShowModalCreateSeat}
                // getListSeatPaginate={getListSeatPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateSeat
                show={showModalUpdateSeat}
                setShow={setShowModalUpdateSeat}
                dataUpdate={dataUpdate}
                // getListSeatPaginate={getListSeatPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteSeat
                show={showModalDeleteSeat}
                setShow={setShowModalDeleteSeat}
                dataDelete={dataDelete}
                // getListSeatPaginate={getListSeatPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default SeatAdmin