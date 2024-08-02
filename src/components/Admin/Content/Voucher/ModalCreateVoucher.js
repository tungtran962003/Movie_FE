import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createVoucher } from '../../../../services/VoucherService';

const ModalCreateVoucher = (props) => {
    const { show, setShow, getListVoucherPaginate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setStartDate('')
        setEndDate('')
        setQuantity('')
        setMinimumPrice('')

        setErrorName('')
        setErrorStartDate('')
        setErrorEndDate('')
        setErrorQuantity('')
        setErrorMinimumPrice('')
    }
    const handleShow = () => setShow(true);

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [minimumPrice, setMinimumPrice] = useState('')

    const [errorCode, setErrorCode] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorStartDate, setErrorStartDate] = useState('')
    const [errorEndDate, setErrorEndDate] = useState('')
    const [errorQuantity, setErrorQuantity] = useState('')
    const [errorMinimumPrice, setErrorMinimumPrice] = useState('')

    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const checkQuantity = () => {
        const regexNumber = /\D/
        if (quantity === '') {
            setErrorQuantity('Chưa nhập số lượng')
            return false
        }
        if (regexNumber.test(quantity)) {
            setErrorQuantity('Số lượng phải là số')
            return false
        }
        setErrorQuantity('')
        return true
    }

    const checkMinimumPrice = () => {
        const regexPrice = /\D/
        if (minimumPrice === '') {
            setErrorMinimumPrice('Chưa nhập giá tối thiểu')
            return false
        }
        if (regexPrice.test(minimumPrice)) {
            setErrorMinimumPrice('Số lượng phải là số')
            return false
        }
        setErrorMinimumPrice('')
        return true
    }

    const checkStartDate = () => {
        console.log(startDate);

        if (startDate === '') {
            setErrorStartDate('Chưa chọn ngày bắt đầu')
            return false
        }
        setErrorStartDate('')
        return true
    }

    const checkEndDate = () => {
        if (endDate === '') {
            setErrorEndDate('Chưa chọn ngày kết thúc')
            return false
        }
        setErrorEndDate('')
        return true
    }

    const check2Date = () => {
        let startDateStr = new Date(startDate)
        let endDateStr = new Date(endDate)
        if (startDateStr > endDateStr) {
            setErrorStartDate('Ngày bắt đầu phải nhỏ hơn ngày hơn kết thúc')
            return false
        }
        setErrorStartDate('')
        return true
    }

    const handleSubmitCreate = async () => {
        let isName = checkName()
        let isQuantity = checkQuantity()
        let isMinimumPrice = checkMinimumPrice()
        let isStartDate = checkStartDate()
        let isEndDate = checkEndDate()

        if (isName && isQuantity && isMinimumPrice && isStartDate && isEndDate) {
            let isCheckDate = check2Date()
            if (!isCheckDate) {
                return
            }
            let response = await createVoucher(name, quantity, minimumPrice, startDate, endDate, token)
            if (response.statusCode === 0) {
                await getListVoucherPaginate(0)
                props.setCurrentPage(0)
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
            >
                <Modal.Header closeButton>
                    <Modal.Title>THÊM VOUCHER</Modal.Title>
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
                                        <label className="form-label fw-bold">Ngày bắt đầu</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorStartDate}</span>
                                    </div>
                                </div>
                                <input type="datetime-local" className="form-control"
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Ngày kết thúc</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorEndDate}</span>
                                    </div>
                                </div>
                                <input type="datetime-local" className="form-control"
                                    value={endDate}
                                    onChange={(event) => setEndDate(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Số lượng</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorQuantity}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={quantity === '0' ? '' : quantity}
                                    onChange={(event) => setQuantity(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Giá tối thiểu</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorMinimumPrice}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={minimumPrice === '0' ? '' : minimumPrice}
                                    onChange={(event) => setMinimumPrice(event.target.value)}
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

export default ModalCreateVoucher;