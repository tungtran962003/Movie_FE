import { useState } from 'react'
import './RoomAdmin.scss'
import TableRoom from './TableRoom'
import { getPageRoom } from '../../../../services/RoomService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateRoom from './ModalCreateRoom'
import ModalUpdateRoom from './ModalUpdateRoom'
import ModalDeleteRoom from './ModalDeleteRoom'
import { getCookie } from '../../../Auth/CookieManager'
import { useLocation, useParams } from 'react-router-dom'
import { getPageRoomByCinema, getPageRoomByCinemaId } from '../../../../services/CinemaService'

const RoomAdmin = () => {

    const [listRoom, setListRoom] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const params = useParams()

    const location = useLocation()

    const token = getCookie('cookie')

    const cinema = location?.state?.cinema

    const getListRoomPaginate = async (page) => {
        debugger
        let response = await getPageRoom(page, pageSize, cinema.id, token)
        setListRoom(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false)
    const [showModalUpdateRoom, setShowModalUpdateRoom] = useState(false)
    const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false)

    const handleClickUpdate = (roomUpdate) => {
        setShowModalUpdateRoom(true)
        setDataUpdate(roomUpdate)
    }

    const handleClickDelete = (roomDelete) => {
        setShowModalDeleteRoom(true)
        setDataDelete(roomDelete)
    }

    const fetchPageMovieByCinemaId = async () => {
        let response = await getPageRoomByCinemaId(params.id, 0, 10, token)
        console.log(response);
    }

    useEffect(() => {
        // fetchPageMovieByCinemaId()
        getListRoomPaginate(0)
    }, [])

    return (
        <>
            <div className="room-container">
                <div className="title-manager">
                    Danh sách phòng tại rạp {cinema?.name}
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateRoom(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableRoom
                        listRoom={listRoom}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListRoomPaginate={getListRoomPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateRoom
                show={showModalCreateRoom}
                setShow={setShowModalCreateRoom}
                getListRoomPaginate={getListRoomPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                cinema={cinema}
            />

            <ModalUpdateRoom
                show={showModalUpdateRoom}
                setShow={setShowModalUpdateRoom}
                dataUpdate={dataUpdate}
                getListRoomPaginate={getListRoomPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteRoom
                show={showModalDeleteRoom}
                setShow={setShowModalDeleteRoom}
                dataDelete={dataDelete}
                getListRoomPaginate={getListRoomPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default RoomAdmin