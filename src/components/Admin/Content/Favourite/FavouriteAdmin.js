import { useState } from 'react'
import './FavouriteAdmin.scss'
import TableFavourite from './TableFavourite'
import { getPageFavourite } from '../../../../services/FavouriteService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateFavourite from './ModalCreateFavourite'
import ModalUpdateFavourite from './ModalUpdateFavourite'
import ModalDeleteFavourite from './ModalDeleteFavourite'
import { getCookie } from '../../../Auth/CookieManager'

const FavouriteAdmin = () => {

    const [listFavourite, setListFavourite] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const pageSize = 8;

    const token = getCookie('cookie')

    const getListFavouritePaginate = async (page) => {
        let response = await getPageFavourite(page, pageSize, token)
        setListFavourite(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateFavourite, setShowModalCreateFavourite] = useState(false)
    const [showModalUpdateFavourite, setShowModalUpdateFavourite] = useState(false)
    const [showModalDeleteFavourite, setShowModalDeleteFavourite] = useState(false)

    const handleClickUpdate = (FavouriteUpdate) => {
        setShowModalUpdateFavourite(true)
        setDataUpdate(FavouriteUpdate)
    }

    const handleClickDelete = (FavouriteDelete) => {
        setShowModalDeleteFavourite(true)
        setDataDelete(FavouriteDelete)
    }

    useEffect(() => {
        getListFavouritePaginate(0)
    }, [])

    return (
        <>
            <div className="favourite-container">
                <div className="title-manager">
                    Quản lý phim yêu thích
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateFavourite(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div>
                    <TableFavourite
                        listFavourite={listFavourite}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        getListFavouritePaginate={getListFavouritePaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateFavourite
                show={showModalCreateFavourite}
                setShow={setShowModalCreateFavourite}
                getListFavouritePaginate={getListFavouritePaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalUpdateFavourite
                show={showModalUpdateFavourite}
                setShow={setShowModalUpdateFavourite}
                dataUpdate={dataUpdate}
                getListFavouritePaginate={getListFavouritePaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteFavourite
                show={showModalDeleteFavourite}
                setShow={setShowModalDeleteFavourite}
                dataDelete={dataDelete}
                getListFavouritePaginate={getListFavouritePaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default FavouriteAdmin