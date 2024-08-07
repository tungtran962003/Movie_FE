import { useState } from 'react'
import './MovieAdmin.scss'
import TableMovie from './TableMovie'
import { getPageMovie, getPageMovieIsShowing, getPageUpComingMovie } from '../../../../services/MovieService'
import { useEffect } from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import ModalCreateMovie from './ModalCreateMovie'
import ModalUpdateMovie from './ModalUpdateMovie'
import ModalDeleteMovie from './ModalDeleteMovie'
import { getCookie } from '../../../Auth/CookieManager'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TableMovieIsShowing from './TableMovieIsShowing'
import TableUpComingMovie from './TableUpComingMovie'
import FormSearchMovie from './FormSearchMovie'

const MovieAdmin = () => {

    const [listMovie, setListMovie] = useState([])

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(0)

    const [tabMovie, setTabMovie] = useState('all')

    const pageSize = 8;

    const token = getCookie('cookie')

    const getListMoviePaginate = async (page) => {
        let response = await getPageMovie(page, pageSize, token)
        setListMovie(response.content)
        setPageCount(response.totalPages)
    }

    const getListMovieIsShowingPaginate = async (page) => {
        let response = await getPageMovieIsShowing(page, pageSize, token)
        setListMovie(response.content)
        setPageCount(response.totalPages)
    }

    const getListUpComingMoviePaginate = async (page) => {
        let response = await getPageUpComingMovie(page, pageSize, token)
        setListMovie(response.content)
        setPageCount(response.totalPages)
    }

    const [showModalCreateMovie, setShowModalCreateMovie] = useState(false)
    const [showModalUpdateMovie, setShowModalUpdateMovie] = useState(false)
    const [showModalDeleteMovie, setShowModalDeleteMovie] = useState(false)

    const handleClickUpdate = (movieUpdate) => {
        setShowModalUpdateMovie(true)
        setDataUpdate(movieUpdate)
    }

    const handleClickDelete = (movieDelete) => {
        setShowModalDeleteMovie(true)
        setDataDelete(movieDelete)
    }

    useEffect(() => {
        if (tabMovie === 'all') {
            getListMoviePaginate(0)
            return
        }
        if (tabMovie === 'isShowing') {
            getListMovieIsShowingPaginate(0)
            return
        }
        if (tabMovie === 'upComing') {
            getListUpComingMoviePaginate(0)
            return
        }
    }, [tabMovie])

    return (
        <>
            <div className="movie-container">
                <div className="title-manager">
                    Quản lý phim
                </div>
                <div className="content-manager">
                    <div className="border-btn">
                        <button
                            className="btn-add"
                            onClick={() => setShowModalCreateMovie(true)}
                        >
                            <RiAddBoxFill style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </div>
                <div className='search-container'>
                    <FormSearchMovie />
                </div>
                <div>
                    <Tabs
                        defaultActiveKey="all"
                        id="fill-tab-example"
                        className="mb-3 px-4"
                        style={{ fontSize: '18px', fontWeight: '600' }}
                        fill
                        onSelect={(key) => setTabMovie(key)}
                    >
                        <Tab eventKey="all" title="Tất cả phim">
                            <TableMovie
                                listMovie={listMovie}
                                handleClickUpdate={handleClickUpdate}
                                handleClickDelete={handleClickDelete}
                                getListMoviePaginate={getListMoviePaginate}
                                pageCount={pageCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Tab>
                        <Tab eventKey="isShowing" title="Phim đang chiếu">
                            <TableMovieIsShowing
                                listMovie={listMovie}
                                handleClickUpdate={handleClickUpdate}
                                handleClickDelete={handleClickDelete}
                                getListMovieIsShowingPaginate={getListMovieIsShowingPaginate}
                                pageCount={pageCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                tabMovie={tabMovie}
                            />
                        </Tab>
                        <Tab eventKey="upComing" title="Phim sắp chiếu">
                            <TableUpComingMovie
                                listMovie={listMovie}
                                handleClickUpdate={handleClickUpdate}
                                handleClickDelete={handleClickDelete}
                                getPageUpComingMovie={getPageUpComingMovie}
                                pageCount={pageCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                tabMovie={tabMovie}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <ModalCreateMovie
                show={showModalCreateMovie}
                setShow={setShowModalCreateMovie}
                getListMoviePaginate={getListMoviePaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tabMovie={tabMovie}
                setTabMovie={setTabMovie}
                getListMovieIsShowingPaginate={getListMovieIsShowingPaginate}
                getListUpComingMoviePaginate={getListUpComingMoviePaginate}
            />

            <ModalUpdateMovie
                show={showModalUpdateMovie}
                setShow={setShowModalUpdateMovie}
                dataUpdate={dataUpdate}
                getListMoviePaginate={getListMoviePaginate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tabMovie={tabMovie}
                setTabMovie={setTabMovie}
                getListMovieIsShowingPaginate={getListMovieIsShowingPaginate}
                getListUpComingMoviePaginate={getListUpComingMoviePaginate}
            />

            <ModalDeleteMovie
                show={showModalDeleteMovie}
                setShow={setShowModalDeleteMovie}
                dataDelete={dataDelete}
                getListMoviePaginate={getListMoviePaginate}
                setDataDelete={setDataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tabMovie={tabMovie}
                setTabMovie={setTabMovie}
                getListMovieIsShowingPaginate={getListMovieIsShowingPaginate}
                getListUpComingMoviePaginate={getListUpComingMoviePaginate}
            />
        </>
    )
}

export default MovieAdmin