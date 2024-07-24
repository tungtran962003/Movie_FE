import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../../../Auth/CookieManager';
import { updateCinema } from '../../../../services/CinemaService';

const ModalUpdateCinema = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setAddress('')
        setHotline('')

        setErrorName('')
        setErrorAddress('')
        setErrorHotline('')

        setDataUpdate({})
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
        let regexHotline = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/
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


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setHotline(dataUpdate.hotline)
            setAddress(dataUpdate.address)
        }
    }, [dataUpdate])

    const handleSubmitUpdate = async () => {
        let isName = checkName(name)
        let isAddress = checkAddress(address)
        let isHotline = checkHotline(hotline)
        if (isName && isAddress && isHotline) {
            let response = await updateCinema(dataUpdate.id, name, address, hotline, token)
            if (response.statusCode === 0) {
                props.setCurrentPage(props.currentPage)
                toast.success(response.message);
                handleClose()
                await props.getListCinemaPaginate(props.currentPage)
            } else {
                toast.error(response.message);
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
                    <Modal.Title>CẬP NHẬT RẠP CHIẾU PHIM</Modal.Title>
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
                    <Button variant="primary" className='btn-info' onClick={() => handleSubmitUpdate()}>
                        <FaPenSquare style={{ fontSize: '23px', margin: '0 15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateCinema;