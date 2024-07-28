import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from 'react';


const TableTicket = (props) => {

    const { listTicket, pageCount } = props

    const handlePageClick = (event) => {
        props.getListTicketPaginate(+event.selected)
        props.setCurrentPage(+event.selected)
    };

    return (
        <div className="table-ticket">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="bg-info" scope="col">ID</th>
                        <th className="bg-info" scope="col">Mã vé</th>
                        <th className="bg-info" scope="col">Tên</th>
                        <th className="bg-info" scope="col">Giá tiền</th>
                        <th className="bg-info" scope="col">Lịch chiếu</th>
                        <th className="bg-info" scope="col">Ghế</th>
                        <th className="bg-info" scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listTicket && listTicket.length > 0 &&
                        listTicket.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.schedule.name}</td>
                                    <td>{item.seat.name}</td>
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
                    {listTicket && listTicket.length === 0 &&
                        <tr>
                            <td colSpan={'8'}>Không có dữ liệu</td>
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

export default TableTicket