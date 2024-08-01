import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createCinema } from '../../../../services/CinemaService';

const ModalCreateCinema = (props) => {
    const { show, setShow, getListCinemaPaginate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setAddress('')
        setHotline('')

        setErrorName('')
        setErrorAddress('')
        setErrorHotline('')
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [hotline, setHotline] = useState('')

    const [errorName, setErrorName] = useState('')
    const [errorAddress, setErrorAddress] = useState('')
    const [errorHotline, setErrorHotline] = useState('')

    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const checkAddress = () => {
        if (address === '') {
            setErrorAddress('Chưa nhập địa chỉ')
            return false
        }
        setErrorAddress('')
        return true
    }

    const checkHotline = () => {
        let regexHotline = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        if (hotline === '') {
            setErrorHotline('Chưa nhập số điện thoại')
            return false
        }
        if (!regexHotline.test(hotline)) {
            setErrorHotline('Số điện thoại sai định dạng')
            return false
        }
        setErrorHotline('')
        return true
    }

    const handleSubmitCreate = async () => {
        let isName = checkName()
        let isAddress = checkAddress()
        let isHotline = checkHotline()
        if (isName && isAddress && isHotline) {
            let response = await createCinema(name, address, hotline, token)
            if (response.statusCode === 0) {
                await getListCinemaPaginate(0)
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
                    <Modal.Title>THÊM RẠP CHIẾU PHIM</Modal.Title>
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
                                        <label className="form-label fw-bold">Địa chỉ</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorAddress}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 " >
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Hotline</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorHotline}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={hotline}
                                    onChange={(event) => setHotline(event.target.value)}
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

export default ModalCreateCinema;