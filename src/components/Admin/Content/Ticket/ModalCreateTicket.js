import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createTicket } from '../../../../services/TicketService';
import _ from 'lodash'
// import { getAllSchedule } from '../../../../services/ScheduleService';

const ModalCreateTicket = (props) => {
    const { show, setShow, getListTicketPaginate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setPrice('')
        setSelectedSchedule('')
        setSelectedSeat('')

        setErrorName('')
        setErrorPrice('')
        setErrorSelectedSchedule('')
        setErrorSelectedSeat('')
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [selectedSchedule, setSelectedSchedule] = useState({})
    const [listSchedule, setListSchedule] = useState([])
    const [selectedSeat, setSelectedSeat] = useState({})
    const [listSeat, setListSeat] = useState([])

    const [errorName, setErrorName] = useState('')
    const [errorPrice, setErrorPrice] = useState('')
    const [errorSelectedSchedule, setErrorSelectedSchedule] = useState('')
    const [errorSelectedSeat, setErrorSelectedSeat] = useState('')


    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const checkPrice = () => {
        if (price === '') {
            setErrorPrice('Chưa nhập giá tiền')
            return false
        }
        if (isNaN(price)) {
            setErrorPrice('Giá tiền phải là số')
            return false
        }
        setErrorPrice('')
        return true
    }

    // const getListSchedule = async () => {
    //     let response = await getAllSchedule(token)
    //     if (!_.isEmpty(response)) {
    //         let listSelectedSchedule = response.map(item => {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         })
    //         setListSchedule(listSelectedSchedule)
    //     }
    // }

    const checkSelectedSchedule = () => {
        if (_.isEmpty(selectedSchedule)) {
            setErrorSelectedSchedule('Chưa chọn lịch chiếu')
            return false
        }
        setErrorSelectedSchedule('')
        return true
    }

    const handleSubmitCreate = async () => {
        let isName = checkName()
        let isPrice = checkPrice()
        let isSelectedSchedule = checkSelectedSchedule()
        if (isName && isPrice && isSelectedSchedule) {
            let response = await createTicket(name, isPrice, selectedSchedule.value, token)
            if (response.statusCode === 0) {
                await getListTicketPaginate(0)
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
    //     getListSchedule()
    // }, [])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>THÊM VÉ</Modal.Title>
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
                                        <label className="form-label fw-bold">Giá tiền</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorPrice}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Rạp chiếu</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorSelectedSchedule}</span>
                                    </div>
                                </div>
                                <Select
                                    value={selectedSchedule}
                                    onChange={setSelectedSchedule}
                                    options={listSchedule}
                                    placeholder='Chọn thể lịch chiếu phim'
                                />
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

export default ModalCreateTicket;