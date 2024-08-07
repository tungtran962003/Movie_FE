import { IoSearch } from "react-icons/io5";
import { getCookie } from "../../../Auth/CookieManager";
import Select from 'react-select';
import { useEffect, useState } from "react";
import { getAllMovieType } from "../../../../services/MovieTypeService";
import _ from "lodash";
import { searchMovie } from "../../../../services/MovieService";

const FormSearchMovie = (props) => {

    const [selectedMovieType, setSelectedMovieType] = useState({})
    const [listMovieType, setListMovieType] = useState([])

    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [language, setLanguage] = useState('')
    const [director, setDirector] = useState('')
    const [performer, setPerformer] = useState('')

    const page = 0

    const pageSize = 10


    const token = getCookie('cookie')

    const getListMovieType = async () => {
        let response = await getAllMovieType(token)
        if (!_.isEmpty(response)) {
            let listSelectedMovieType = response.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setListMovieType(listSelectedMovieType)
        }
    }

    useEffect(() => {
        getListMovieType()
    }, [])



    const handleClickSearch = async () => {
        if (selectedMovieType.value === undefined) {
            selectedMovieType.value = null
        }
        let response = await searchMovie(+page, +pageSize, name, startDate, endDate, director, language, performer, null, token)
        console.log(response);
    }

    return (
        <>
            {/* <div className="title-search">
                Tìm kiếm
            </div> */}
            <div className="row">
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Tên phim</label>
                    <input type="text" class="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Thời lượng</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Ngày khởi chiếu (Bắt đầu)</label>
                    <input type="date" class="form-control"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Ngày khởi chiếu (Kết thúc)</label>
                    <input type="date" class="form-control"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Thể loại phim</label>
                    <Select
                        value={selectedMovieType}
                        onChange={setSelectedMovieType}
                        options={listMovieType}
                        placeholder='Chọn thể loại phim'
                    />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Ngôn ngữ</label>
                    <input type="text" className="form-control"
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                    />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Diễn viên</label>
                    <input type="text" className="form-control"
                        value={performer}
                        onChange={(event) => setPerformer(event.target.value)}
                    />
                </div>
                <div class="mb-3 col-3">
                    <label class="form-label fw-bold">Đạo diễn</label>
                    <input type="text" className="form-control"
                        value={director}
                        onChange={(event) => setDirector(event.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={() => handleClickSearch()}>
                    <IoSearch style={{ fontSize: '25px', margin: '0 15px' }} />
                </button>
            </div>
        </>
    )
}

export default FormSearchMovie