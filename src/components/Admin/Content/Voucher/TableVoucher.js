import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


const TableVoucher = (props) => {

    const { listVoucher, pageCount } = props

    const navigate = useNavigate()

    const handlePageClick = (event) => {
        props.getListVoucherPaginate(+event.selected)
        props.setCurrentPage(+event.selected)
    };

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Chuyển đổi giờ 24h sang giờ 12h
        return `${year}-${month}-${day} ${formattedHours}:${minutes} ${period}`;
    }

    return (
        <div className="table-voucher">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="bg-info" scope="col">Mã</th>
                        <th className="bg-info" scope="col">Tên</th>
                        <th className="bg-info" scope="col">Ngày bắt đầu</th>
                        <th className="bg-info" scope="col">Ngày kết thúc</th>
                        <th className="bg-info" scope="col">Số lượng</th>
                        <th className="bg-info" scope="col">Giá tối thiểu</th>
                        <th className="bg-info" scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listVoucher && listVoucher.length > 0 &&
                        listVoucher.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{formatDateTime(new Date(item.startDate))}</td>
                                    <td>{formatDateTime(new Date(item.endDate))}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCurrency(item.minimumPrice)}</td>
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
                    {listVoucher && listVoucher.length === 0 &&
                        <tr>
                            <td colSpan={'7'}>Không có dữ liệu</td>
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

export default TableVoucher