import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createRoom } from '../../../../services/RoomService';
import _ from 'lodash'
import { getAllCinema } from '../../../../services/CinemaService';

const ModalCreateRoom = (props) => {
    const { show, setShow, getListRoomPaginate, cinema } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setCapacity('')
        setSelectedCinema('')

        setErrorName('')
        setErrorCapacity('')
        setErrorSelectedCinema('')
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [selectedCinema, setSelectedCinema] = useState({})
    const [listCinema, setListCinema] = useState([])

    const [errorName, setErrorName] = useState('')
    const [errorCapacity, setErrorCapacity] = useState('')
    const [errorSelectedCinema, setErrorSelectedCinema] = useState('')


    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const checkCapacity = () => {
        if (capacity === '') {
            setErrorCapacity('Chưa nhập sức chứa')
            return false
        }
        if (isNaN(capacity)) {
            setErrorCapacity('Sức chứa phải là số')
            return false
        }
        if (capacity > 120) {
            setErrorCapacity('Sức chứa tối đa là 120')
            return false
        }
        setErrorCapacity('')
        return true
    }

    // const getListCinema = async () => {
    //     let response = await getAllCinema(token)
    //     if (!_.isEmpty(response)) {
    //         let listSelectedCinema = response.map(item => {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         })
    //         setListCinema(listSelectedCinema)
    //     }
    // }

    // const checkSelectedCinema = () => {
    //     if (_.isEmpty(selectedCinema)) {
    //         setErrorSelectedCinema('Chưa chọn rạp chiếu')
    //         return false
    //     }
    //     setErrorSelectedCinema('')
    //     return true
    // }

    const handleSubmitCreate = async () => {
        let isName = checkName()
        let isCapacity = checkCapacity()
        // let isSelectedCinema = checkSelectedCinema()
        if (isName && isCapacity) {
            let response = await createRoom(name, capacity, cinema.id, token)
            if (response.statusCode === 0) {
                await getListRoomPaginate(0)
                props.setCurrentPage(0)
                toast.success(response.message)
                handleClose()
            } else {
                toast.error(response.message)
            }
        }
    }

    // useEffect(() => {
    //     getListCinema()
    // }, [])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>THÊM PHÒNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className=''>
                            <div className="mb-3 " >
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

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Sức chứa</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorCapacity}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={capacity}
                                    onChange={(event) => setCapacity(event.target.value)}
                                />
                            </div>

                            {/* <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Rạp chiếu</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorSelectedCinema}</span>
                                    </div>
                                </div>
                                <Select
                                    value={selectedCinema}
                                    onChange={setSelectedCinema}
                                    options={listCinema}
                                    placeholder='Chọn thể loại phim'
                                />
                            </div> */}
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

export default ModalCreateRoom;