import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from 'react';


const TableSeatStatus = (props) => {

    const { listSeatStatus, pageCount } = props

    const handlePageClick = (event) => {
        props.getListSeatStatusPaginate(+event.selected)
        props.setCurrentPage(+event.selected)
        console.log(`User requested page number ${event.selected}`);
    };


    return (
        <div className="table-seatStatus">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="bg-info" scope="col">ID</th>
                        <th className="bg-info" scope="col">Tên</th>
                        <th className="bg-info" scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listSeatStatus && listSeatStatus.length > 0 &&
                        listSeatStatus.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className=''>
                                        <div className="dropdown">
                                            <button className="btn btn-info" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <HiDotsVertical className="d-flex justify-content-center align-items-center" />
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
                    {listSeatStatus && listSeatStatus.length === 0 &&
                        <tr>
                            <td colSpan={'3'}>Không có dữ liệu</td>
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

export default TableSeatStatus