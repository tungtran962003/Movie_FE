import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../../../Auth/CookieManager';
import { getAllCinema, updateCinema } from '../../../../services/CinemaService';
import { updateRoom } from '../../../../services/RoomService';

const ModalUpdateRoom = (props) => {
    const { show,
        setShow,
        dataUpdate,
        setDataUpdate,
        setCurrentPage,
        currentPage,
        getListRoomPaginate } = props;

    const handleClose = () => {
        setShow(false)
        setCapacity('')
        setSelectedCinema('')

        setErrorName('')
        setErrorCapacity('')
        setErrorSelectedCinema('')

        setDataUpdate({})
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
            setErrorCapacity('Sức chưa phải là số')
            return false
        }
        setErrorCapacity('')
        return true
    }

    const getListCinema = async () => {
        let response = await getAllCinema(token)
        if (!_.isEmpty(response)) {
            let listSelectedCinema = response.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setListCinema(listSelectedCinema)
        }
    }

    const checkSelectedCinema = () => {
        if (_.isEmpty(selectedCinema)) {
            setErrorSelectedCinema('Chưa chọn rạp chiếu')
            return false
        }
        setErrorSelectedCinema('')
        return true
    }

    useEffect(() => {
        getListCinema()
    }, [])


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setCapacity(dataUpdate.capacity)
            setSelectedCinema(
                {
                    value: dataUpdate.cinema.id,
                    label: dataUpdate.cinema.name
                }
            )
        }
    }, [dataUpdate])

    const handleSubmitUpdate = async () => {
        let isName = checkName()
        let isCapacity = checkCapacity()
        let isSelectedCinema = checkSelectedCinema()
        if (isName && isCapacity && isSelectedCinema) {
            let response = await updateRoom(dataUpdate.id, name, capacity, selectedCinema.value, token)
            if (response.statusCode === 0) {
                await getListRoomPaginate(currentPage)
                setCurrentPage(currentPage)
                toast.success(response.message)
                handleClose()
            } else {
                toast.error(response.message)
                handleClose()
            }
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>CẬP NHẬT PHÒNG</Modal.Title>
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

                            <div className="mb-3 " >
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
                                    placeholder='Chọn rạp chiếu'
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-info' onClick={() => handleSubmitUpdate()}>
                        <FaPenSquare style={{ fontSize: '23px', margin: '0 15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateRoom;