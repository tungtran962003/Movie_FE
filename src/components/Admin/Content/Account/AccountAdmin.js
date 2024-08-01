import { useState } from 'react'
import './AccountAdmin.scss'
import TableAccount from './TableAccount'
import { getPageAccount, getPageRoomByAccount } from '../../../../services/AccountService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateAccount from './ModalCreateAccount'
import ModalUpdateAccount from './ModalUpdateAccount'
import ModalDeleteAccount from './ModalDeleteAccount'
import { getCookie } from '../../../Auth/CookieManager'
import { useNavigate } from 'react-router-dom'

const AccountAdmin = () => {

    const [listAccount, setListAccount] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const navigate = useNavigate()

    const getListAccountPaginate = async (page) => {
        let response = await getPageAccount(page, pageSize, token)
        setListAccount(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateAccount, setShowModalCreateAccount] = useState(false)
    const [showModalUpdateAccount, setShowModalUpdateAccount] = useState(false)
    const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false)

    const handleClickUpdate = (accountUpdate) => {
        setShowModalUpdateAccount(true)
        setDataUpdate(accountUpdate)
    }

    const handleClickDelete = (AccountDelete) => {
        setShowModalDeleteAccount(true)
        setDataDelete(AccountDelete)
    }

    useEffect(() => {
        getListAccountPaginate(0)
    }, [])

    return (
        <>
            <div className="account-container">
                <div className="title-manager">
                    Quản lý tài khoản
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateAccount(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableAccount
                        listAccount={listAccount}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListAccountPaginate={getListAccountPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateAccount
                show={showModalCreateAccount}
                setShow={setShowModalCreateAccount}
                getListAccountPaginate={getListAccountPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateAccount
                show={showModalUpdateAccount}
                setShow={setShowModalUpdateAccount}
                dataUpdate={dataUpdate}
                getListAccountPaginate={getListAccountPaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteAccount
                show={showModalDeleteAccount}
                setShow={setShowModalDeleteAccount}
                dataDelete={dataDelete}
                getListAccountPaginate={getListAccountPaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default AccountAdmin