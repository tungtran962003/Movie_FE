import moment from 'moment';
import { MdAutoFixHigh } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';

const TableMovieIsShowing = (props) => {

    const { listMovie, pageCount, setCurrentPage, currentPage, tabMovie } = props

    const handlePageClick = (event) => {
        props.getListMovieIsShowingPaginate(+event.selected)
        props.setCurrentPage(+event.selected)
    };

    const convertGMTtoVietnamese = (dateTime) => {
        const vietnameseDateTime = moment(dateTime).utcOffset(7).format('DD/MM/YYYY');
        return vietnameseDateTime;
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [tabMovie])

    return (
        <div className="table-movie">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="bg-info" scope="col">ID</th>
                        <th className="bg-info" scope="col">Tên</th>
                        <th className="bg-info" scope="col">Thời lượng</th>
                        <th className="bg-info" scope="col">Ngày khởi chiếu</th>
                        <th className="bg-info" scope="col">Mô tả</th>
                        <th className="bg-info" scope="col">Đạo diễn</th>
                        <th className="bg-info" scope="col">Ngôn ngữ</th>
                        <th className="bg-info" scope="col">Diễn viên</th>
                        <th className="bg-info" scope="col">Thể loại</th>
                        <th className="bg-info" scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listMovie && listMovie.length > 0 &&
                        listMovie.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.time + ` phút`}</td>
                                    <td>{convertGMTtoVietnamese(item.premiereDate)}</td>
                                    <td>{item.description}</td>
                                    <td>{item.director}</td>
                                    <td>{item.language}</td>
                                    <td>{item.performer}</td>
                                    <td>{item.movieType.name}</td>
                                    <td className=''>
                                        <div className="dropdown">
                                            <button className="btn btn-info" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <HiDotsVertical />
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                <li style={{ cursor: 'pointer' }}><a className="dropdown-item" onClick={() => props.handleClickUpdate(item)}>Sửa</a></li>
                                                <li style={{ cursor: 'pointer' }}><a className="dropdown-item" onClick={() => props.handleClickDelete(item)}>Xoá</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listMovie && listMovie?.length === 0 &&
                        <tr>
                            <td colSpan={'10'}>Không có dữ liệu</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage}
                />
            </div>
        </div>
    )
}

export default TableMovieIsShowing
