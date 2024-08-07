import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createSeat } from '../../../../services/SeatService';
import _ from 'lodash'
import { getAllCinema } from '../../../../services/CinemaService';
import { getAllRoom } from '../../../../services/RoomService';
import { getAllSeatStatus } from '../../../../services/SeatStatusService';
import { getAllSeatType } from '../../../../services/SeatTypeService';

const ModalCreateSeat = (props) => {
    const { show, setShow, getListSeatPaginate } = props;

    const handleClose = () => {
        setShow(false)
        setCode('')
        setLine('')
        setSelectedRoom('')
        setSelectedSeatStatus('')
        setSelectedSeatType('')

        setErrorCode('')
        setErrorLine('')
        setErrorSelectedRoom('')
        setErrorSelectedSeatStatus('')
        setErrorSelectedSeatType('')
    }
    const handleShow = () => setShow(true);

    const [code, setCode] = useState('')
    const [line, setLine] = useState('')
    const [selectedRoom, setSelectedRoom] = useState({})
    const [listRoom, setListRoom] = useState([])
    const [selectedSeatStatus, setSelectedSeatStatus] = useState({})
    const [listSeatStatus, setListSeatStatus] = useState([])
    const [selectedSeatType, setSelectedSeatType] = useState({})
    const [listSeatType, setListSeatType] = useState([])

    const [horizontal, setHorizontal] = useState('')
    const [vertical, setVertical] = useState('')
    const [errorVertical, setErrorVertical] = useState('')
    const [errorHorizontal, setErrorHorizontal] = useState('')

    const [errorCode, setErrorCode] = useState('')
    const [errorLine, setErrorLine] = useState('')
    const [errorSelectedRoom, setErrorSelectedRoom] = useState('')
    const [errorSelectedSeatStatus, setErrorSelectedSeatStatus] = useState('')
    const [errorSelectedSeatType, setErrorSelectedSeatType] = useState('')


    const token = getCookie('cookie')

    const checkHorizontal = () => {
        const regexHorizontal = /\D/
        if (horizontal === '') {
            setErrorHorizontal('Chưa nhập số hàng')
            return false
        }
        if (regexHorizontal.test(horizontal)) {
            setErrorHorizontal('Hàng phải là số')
            return false
        }
        setErrorHorizontal('')
        return true
    }

    const checkVertical = () => {
        const regexVertical = /\D/
        if (vertical === '') {
            setErrorVertical('Chưa nhập số cột')
            return false
        }
        if (regexVertical.test(vertical)) {
            setErrorVertical('Cột phải là số')
            return false
        }
        setErrorVertical('')
        return true
    }

    const checkLine = () => {
        if (line === '') {
            setErrorLine('Chưa nhập hàng')
            return false
        }
        if (!isNaN(line)) {
            setErrorLine('Hàng phải là chữ cái')
            return false
        }
        setErrorLine('')
        return true
    }

    // const getListRoom = async () => {
    //     let response = await getAllRoom(token)
    //     if (!_.isEmpty(response)) {
    //         let listSelectedRoom = response.map(item => {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         })
    //         setListRoom(listSelectedRoom)
    //     }
    // }

    // const checkSelectedRoom = () => {
    //     if (_.isEmpty(selectedRoom)) {
    //         setErrorSelectedRoom('Chưa chọn phòng')
    //         return false
    //     }
    //     setErrorSelectedRoom('')
    //     return true
    // }

    // const getListSeatStatus = async () => {
    //     let response = await getAllSeatStatus(token)
    //     if (!_.isEmpty(response)) {
    //         let listSelectedSeatStatus = response.map(item => {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         })
    //         setListSeatStatus(listSelectedSeatStatus)
    //     }
    // }

    // const checkSelectedSeatStatus = () => {
    //     if (_.isEmpty(selectedSeatStatus)) {
    //         setErrorSelectedSeatStatus('Chưa chọn trạng thái ghế')
    //         return false
    //     }
    //     setErrorSelectedSeatStatus('')
    //     return true
    // }

    // const getListSeatType = async () => {
    //     let response = await getAllSeatType(token)
    //     if (!_.isEmpty(response)) {
    //         let listSelectedSeatType = response.map(item => {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         })
    //         setListSeatType(listSelectedSeatType)
    //     }
    // }

    // const checkSelectedSeatType = () => {
    //     if (_.isEmpty(selectedSeatType)) {
    //         setErrorSelectedSeatType('Chưa chọn trạng loại ghế')
    //         return false
    //     }
    //     setErrorSelectedSeatType('')
    //     return true
    // }


    const handleSubmitCreate = async () => {
        let isHorizontal = checkHorizontal()
        let isVertical = checkVertical()
        if (isHorizontal && isVertical) {
            let response = await createSeat(code, line, selectedRoom.value, selectedSeatStatus.value, selectedSeatType.value, token)
            if (response.statusCode === 0) {
                await getListSeatPaginate(0)
                props.setCurrentPage(0)
                toast.success(response.message)
                handleClose()
            } else {
                toast.error(response.message)
                handleClose()
            }
        }
    }

    // useEffect(() => {
    //     getListRoom()
    //     getListSeatStatus()
    //     getListSeatType()
    // }, [])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>THÊM GHẾ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className=''>
                            {/* <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Mã ghế</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorCode}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={code}
                                    onChange={(event) => setCode(event.target.value)}
                                />
                            </div> */}

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Số hàng</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorLine}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={line}
                                    onChange={(event) => setLine(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Số cột</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorLine}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={line}
                                    onChange={(event) => setLine(event.target.value)}
                                />
                            </div>

                            {/* <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Phòng</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorSelectedRoom}</span>
                                    </div>
                                </div>
                                <Select
                                    value={selectedRoom}
                                    onChange={setSelectedRoom}
                                    options={listRoom}
                                    placeholder='Chọn phòng'
                                />
                            </div> */}

                            {/* <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Loại ghế</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorSelectedRoom}</span>
                                    </div>
                                </div>
                                <Select
                                    value={selectedSeatType}
                                    onChange={setSelectedSeatType}
                                    options={listSeatType}
                                    placeholder='Chọn loại ghế'
                                />
                            </div> */}

                            {/* <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Trạng thái ghế</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorSelectedSeatStatus}</span>
                                    </div>
                                </div>
                                <Select
                                    value={selectedSeatStatus}
                                    onChange={setSelectedSeatStatus}
                                    options={listSeatStatus}
                                    placeholder='Chọn trạng thái ghế'
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

export default ModalCreateSeat;