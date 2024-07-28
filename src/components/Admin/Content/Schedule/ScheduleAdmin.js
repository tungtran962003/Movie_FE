import { useState } from 'react'
import './ScheduleAdmin.scss'
import TableSchedule from './TableSchedule'
import { getPageSchedule } from '../../../../services/ScheduleService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateSchedule from './ModalCreateSchedule'
import ModalUpdateSchedule from './ModalUpdateSchedule'
import ModalDeleteSchedule from './ModalDeleteSchedule'
import { getCookie } from '../../../Auth/CookieManager'

const ScheduleAdmin = () => {

    const [listSchedule, setListSchedule] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const getListSchedulePaginate = async (page) => {
        let response = await getPageSchedule(page, pageSize, token)
        setListSchedule(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateSchedule, setShowModalCreateSchedule] = useState(false)
    const [showModalUpdateSchedule, setShowModalUpdateSchedule] = useState(false)
    const [showModalDeleteSchedule, setShowModalDeleteSchedule] = useState(false)

    const handleClickUpdate = (scheduleUpdate) => {
        setShowModalUpdateSchedule(true)
        setDataUpdate(scheduleUpdate)
    }

    const handleClickDelete = (scheduleDelete) => {
        setShowModalDeleteSchedule(true)
        setDataDelete(scheduleDelete)
    }

    useEffect(() => {
        getListSchedulePaginate(0)
    }, [])

    return (
        <>
            <div className="schedule-container">
                <div className="title-manager">
                    Quản lý lịch chiếu
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateSchedule(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableSchedule
                        listSchedule={listSchedule}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListSchedulePaginate={getListSchedulePaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateSchedule
                show={showModalCreateSchedule}
                setShow={setShowModalCreateSchedule}
                getListSchedulePaginate={getListSchedulePaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateSchedule
                show={showModalUpdateSchedule}
                setShow={setShowModalUpdateSchedule}
                dataUpdate={dataUpdate}
                getListSchedulePaginate={getListSchedulePaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteSchedule
                show={showModalDeleteSchedule}
                setShow={setShowModalDeleteSchedule}
                dataDelete={dataDelete}
                getListSchedulePaginate={getListSchedulePaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default ScheduleAdmin