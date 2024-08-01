import { useEffect, useState } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { getCookie } from '../../../Auth/CookieManager';
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import _ from 'lodash'
import { createMovie } from '../../../../services/MovieService';
import { getAllMovieType } from '../../../../services/MovieTypeService';

const ModalCreateMovie = (props) => {
    const { show, setShow, getListMoviePaginate, getListMovieIsShowingPaginate, getListUpComingMoviePaginate, tabMovie, setTabMovie } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setTime('')
        setPremiereDate('')
        setLanguage('')
        setDirector('')
        setPerformer('')
        setDescription('')
        setSelectedMovieType('')
        setPreviewImage('')
        setImage('')

        setErrorName('')
        setErrorTime('')
        setErrorPremiereDate('')
        setErrorLanguage('')
        setErrorDirector('')
        setErrorPerformer('')
        setErrorDescription('')
        setErrorSelectedMovieType('')
        setErrorImage('')
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [premiereDate, setPremiereDate] = useState('')
    const [language, setLanguage] = useState('')
    const [director, setDirector] = useState('')
    const [performer, setPerformer] = useState('')
    const [description, setDescription] = useState('')
    const [movieTypeId, setMovieTypeId] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const [selectedMovieType, setSelectedMovieType] = useState({})
    const [listMovieType, setListMovieType] = useState([])

    const [errorName, setErrorName] = useState('')
    const [errorTime, setErrorTime] = useState('')
    const [errorPremiereDate, setErrorPremiereDate] = useState('')
    const [errorLanguage, setErrorLanguage] = useState('')
    const [errorDirector, setErrorDirector] = useState('')
    const [errorPerformer, setErrorPerformer] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorSelectedMovieType, setErrorSelectedMovieType] = useState('')
    const [errorImage, setErrorImage] = useState('')

    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const checkTime = () => {
        if (name === '') {
            setErrorTime('Chưa nhập thời lượng')
            return false
        }
        if (isNaN(time)) {
            setErrorTime('Thời lượng phải là số')
            return false
        }
        setErrorTime('')
        return true
    }

    const checkPremiereDate = () => {
        if (premiereDate === '') {
            setErrorPremiereDate('Chưa chọn ngày khởi chiếu')
            return false
        }
        setErrorPremiereDate('')
        return true
    }

    const checkLanguage = () => {
        if (language === '') {
            setErrorLanguage('Chưa nhập ngôn ngữ')
            return false
        }
        setErrorLanguage('')
        return true
    }

    const checkDirector = () => {
        if (director === '') {
            setErrorDirector('Chưa nhập đạo diễn')
            return false
        }
        setErrorDirector('')
        return true
    }

    const checkPerformer = () => {
        if (director === '') {
            setErrorPerformer('Chưa nhập diễn viên')
            return false
        }
        setErrorPerformer('')
        return true
    }

    const checkDescription = () => {
        if (description === '') {
            setErrorDescription('Chưa nhập mô tả')
            return false
        }
        setErrorDescription('')
        return true
    }

    const checkSelectedMovieType = () => {
        if (_.isEmpty(selectedMovieType)) {
            setErrorSelectedMovieType('Chưa chọn thể loại phim')
            return false
        }
        setErrorSelectedMovieType('')
        return true
    }

    const checkImage = () => {
        if (image === '') {
            setErrorImage('Chưa chọn ảnh')
            return false
        }
        if (image.size > 1024 * 1024) {
            setErrorImage('Vui lòng chọn ảnh dưới 1MB')
            return false
        }
        setErrorImage('')
        return true
    }

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

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    useEffect(() => {
        getListMovieType()
    }, [])


    const handleSubmitCreate = async () => {
        let isName = checkName()
        let isTime = checkTime()
        let isPremiereDate = checkPremiereDate()
        let isLanguage = checkLanguage()
        let isDirector = checkDirector()
        let isPerformer = checkPerformer()
        let isDescription = checkDescription()
        let isSelectedMovieType = checkSelectedMovieType()
        let isImage = checkImage()
        if (isName && isTime && isPremiereDate && isLanguage && isDirector && isPerformer && isDescription && isSelectedMovieType && isImage) {
            let response = await createMovie(name, time, premiereDate, description, director, language, performer, +selectedMovieType.value, image, token)
            if (response.statusCode === 0) {
                if (tabMovie === 'all') {
                    await getListMoviePaginate(0)
                    props.setCurrentPage(0)
                } else if (tabMovie === 'isShowing') {
                    await getListMoviePaginate(0)
                    await getListMovieIsShowingPaginate(0)
                    props.setCurrentPage(0)
                } else {
                    await getListMoviePaginate(0)
                    await getListUpComingMoviePaginate(0)
                    props.setCurrentPage(0)
                }
                toast.success(response.message)
                handleClose()
            } else {
                toast.error(response.message)
            }
        }
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>THÊM PHIM MỚI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='d-flex w-100 justify-content-between'>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Tên</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorName}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Thời lượng</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorTime}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={time === '0' ? '' : time}
                                    onChange={(event) => setTime(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='d-flex w-100 justify-content-between'>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Ngày khởi chiếu</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorPremiereDate}</span>
                                    </div>
                                </div>
                                <input type="date" className="form-control"
                                    value={premiereDate}
                                    onChange={(event) => setPremiereDate(event.target.value)}
                                />
                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Ngôn ngữ</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorLanguage}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={language}
                                    onChange={(event) => setLanguage(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='d-flex w-100 justify-content-between'>
                            <div style={{ width: '48%' }}>
                                <div className="mb-3 " >
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <label className="form-label fw-bold">Đạo diễn</label>
                                        </div>
                                        <div>
                                            <span style={{ color: 'red' }}>{errorDirector}</span>
                                        </div>
                                    </div>
                                    <input type="text" className="form-control"
                                        value={director}
                                        onChange={(event) => setDirector(event.target.value)}
                                    />
                                </div>

                                <div className="mb-3" >
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <label className="form-label fw-bold">Diễn viên</label>
                                        </div>
                                        <div>
                                            <span style={{ color: 'red' }}>{errorPerformer}</span>
                                        </div>
                                    </div>
                                    <input type="text" className="form-control"
                                        value={performer}
                                        onChange={(event) => setPerformer(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Mô tả</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorDescription}</span>
                                    </div>
                                </div>
                                <textarea type="text" className="form-control" style={{ height: '122px' }}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='d-flex w-100 justify-content-between'>
                            <div style={{ width: '48%' }}>
                                <div className="mb-3 " >
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <label className="form-label fw-bold">Thể loại</label>
                                        </div>
                                        <div>
                                            <span style={{ color: 'red' }}>{errorSelectedMovieType}</span>
                                        </div>
                                    </div>
                                    <Select
                                        value={selectedMovieType}
                                        onChange={setSelectedMovieType}
                                        options={listMovieType}
                                        placeholder='Chọn thể loại phim'
                                    />
                                </div>
                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Ảnh</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorImage}</span>
                                    </div>
                                </div>
                                <div>
                                    {previewImage ?
                                        <label className='label-upload' htmlFor='labelUpload'>
                                            <img src={previewImage} />
                                        </label>
                                        :
                                        <label className='label-upload' htmlFor='labelUpload'>
                                            <FaCloudUploadAlt />Tải ảnh lên
                                        </label>
                                    }

                                    <input
                                        hidden
                                        id='labelUpload'
                                        type="file"
                                        onChange={(event) => handleUploadImage(event)}
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-info' onClick={() => handleSubmitCreate()}>
                        <RiAddBoxFill style={{ fontSize: '25px', margin: '0 15px' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateMovie;