import { useState } from 'react'
import './TicketAdmin.scss'
import TableTicket from './TableTicket'
import { getPageTicket } from '../../../../services/TicketService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateTicket from './ModalCreateTicket'
import ModalUpdateTicket from './ModalUpdateTicket'
import ModalDeleteTicket from './ModalDeleteTicket'
import { getCookie } from '../../../Auth/CookieManager'

const TicketAdmin = () => {

    const [listTicket, setListTicket] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const getListTicketPaginate = async (page) => {
        let response = await getPageTicket(page, pageSize, token)
        setListTicket(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateTicket, setShowModalCreateTicket] = useState(false)
    const [showModalUpdateTicket, setShowModalUpdateTicket] = useState(false)
    const [showModalDeleteTicket, setShowModalDeleteTicket] = useState(false)

    const handleClickUpdate = (ticketUpdate) => {
        setShowModalUpdateTicket(true)
        setDataUpdate(ticketUpdate)
    }

    const handleClickDelete = (ticketDelete) => {
        setShowModalDeleteTicket(true)
        setDataDelete(ticketDelete)
    }

    useEffect(() => {
        getListTicketPaginate(0)
    }, [])

    return (
        <>
            <div className="ticket-container">
                <div className="title-manager">
                    Quản lý vé
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateTicket(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableTicket
                        listTicket={listTicket}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListTicketPaginate={getListTicketPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateTicket
                show={showModalCreateTicket}
                setShow={setShowModalCreateTicket}
                getListTicketPaginate={getListTicketPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateTicket
                show={showModalUpdateTicket}
                setShow={setShowModalUpdateTicket}
                dataUpdate={dataUpdate}
                getListTicketPaginate={getListTicketPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteTicket
                show={showModalDeleteTicket}
                setShow={setShowModalDeleteTicket}
                dataDelete={dataDelete}
                getListTicketPaginate={getListTicketPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default TicketAdmin