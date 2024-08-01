import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from "moment";


const TableAccount = (props) => {

    const { listAccount, pageCount } = props

    const navigate = useNavigate()

    const convertGMTtoVietnamese = (dateTime) => {
        const vietnameseDateTime = moment(dateTime).utcOffset(7).format('DD/MM/YYYY');
        return vietnameseDateTime;
    }

    const handlePageClick = (event) => {
        props.getListAccountPaginate(+event.selected)
        props.setCurrentPage(+event.selected)
    };

    return (
        <div className="table-account">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="bg-info" scope="col">Tên</th>
                        <th className="bg-info" scope="col">Email</th>
                        <th className="bg-info" scope="col">Giới tính</th>
                        <th className="bg-info" scope="col">Ngày sinh</th>
                        <th className="bg-info" scope="col">Số điện thoại</th>
                        <th className="bg-info" scope="col">Hạng</th>
                        <th className="bg-info" scope="col">Quyền truy cập</th>
                        <th className="bg-info" scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listAccount && listAccount.length > 0 &&
                        listAccount.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender === true ? 'Nam' : 'Nữ'}</td>
                                    <td>{convertGMTtoVietnamese(item.birthDay)}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.rankCustomer.name}</td>
                                    <td>{item.role.name}</td>
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
                    {listAccount && listAccount.length === 0 &&
                        <tr>
                            <td colSpan={'9'}>Không có dữ liệu</td>
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

export default TableAccount