import { useState } from 'react'
import './VoucherAdmin.scss'
import TableVoucher from './TableVoucher'
import { getPageVoucher, getPageRoomByVoucher } from '../../../../services/VoucherService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateVoucher from './ModalCreateVoucher'
import ModalUpdateVoucher from './ModalUpdateVoucher'
import ModalDeleteVoucher from './ModalDeleteVoucher'
import { getCookie } from '../../../Auth/CookieManager'
import { useNavigate } from 'react-router-dom'

const VoucherAdmin = () => {

    const [listVoucher, setListVoucher] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const navigate = useNavigate()

    const getListVoucherPaginate = async (page) => {
        let response = await getPageVoucher(page, pageSize, token)
        setListVoucher(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateVoucher, setShowModalCreateVoucher] = useState(false)
    const [showModalUpdateVoucher, setShowModalUpdateVoucher] = useState(false)
    const [showModalDeleteVoucher, setShowModalDeleteVoucher] = useState(false)

    const handleClickUpdate = (voucherUpdate) => {
        setShowModalUpdateVoucher(true)
        console.log(voucherUpdate);

        setDataUpdate(voucherUpdate)
    }

    const handleClickDelete = (voucherDelete) => {
        setShowModalDeleteVoucher(true)
        setDataDelete(voucherDelete)
    }

    useEffect(() => {
        getListVoucherPaginate(0)
    }, [])

    return (
        <>
            <div className="voucher-container">
                <div className="title-manager">
                    Quản lý voucher
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateVoucher(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableVoucher
                        listVoucher={listVoucher}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListVoucherPaginate={getListVoucherPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateVoucher
                show={showModalCreateVoucher}
                setShow={setShowModalCreateVoucher}
                getListVoucherPaginate={getListVoucherPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateVoucher
                show={showModalUpdateVoucher}
                setShow={setShowModalUpdateVoucher}
                dataUpdate={dataUpdate}
                getListVoucherPaginate={getListVoucherPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteVoucher
                show={showModalDeleteVoucher}
                setShow={setShowModalDeleteVoucher}
                dataDelete={dataDelete}
                getListVoucherPaginate={getListVoucherPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default VoucherAdmin