import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createSeatType } from '../../../../services/SeatTypeService';

const ModalCreateSeatStatus = (props) => {
    const { show, setShow, getListSeatTypePaginate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setPrice('')
        setErrorName('')
        setErrorPrice('')
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const [errorName, setErrorName] = useState('')
    const [errorPrice, setErrorPrice] = useState('')

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

    const handleSubmitCreate = async () => {
        let isName = checkName()
        let isPrice = checkPrice()
        if (isName && isPrice) {
            let response = await createSeatType(name, price, token)
            if (response.statusCode === 0) {
                await getListSeatTypePaginate(0)
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
                    <Modal.Title>THÊM LOẠI GHẾ</Modal.Title>
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

export default ModalCreateSeatStatus;