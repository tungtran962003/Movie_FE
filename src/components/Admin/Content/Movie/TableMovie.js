import moment from 'moment';

const TableMovie = (props) => {

    const { listMovie } = props

    const convertGMTtoVietnamese = (dateTime) => {
        const vietnameseDateTime = moment(dateTime).utcOffset(7).format('DD/MM/YYYY');
        return vietnameseDateTime;
    }

    return (
        <div className="table-movie">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Thời lượng</th>
                        <th scope="col">Ngày khởi chiếu</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Đạo diễn</th>
                        <th scope="col">Ngôn ngữ</th>
                        <th scope="col">Diễn viên</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listMovie && listMovie.length > 0 &&
                        listMovie.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.time + ` phút`}</td>
                                    <td>{convertGMTtoVietnamese(item.premiereDate)}</td>
                                    <td>{item.description}</td>
                                    <td>{item.director}</td>
                                    <td>{item.language}</td>
                                    <td>{item.performer}</td>
                                    <td>
                                        <button>Sửa</button>
                                        <button>Xoá</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableMovie