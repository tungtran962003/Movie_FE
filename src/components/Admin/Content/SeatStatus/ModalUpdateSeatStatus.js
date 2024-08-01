import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import { updateSeatStatus } from '../../../../services/SeatStatusService';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../../../Auth/CookieManager';

const ModalUpdateSeatStatus = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')

        setErrorName('')
        setDataUpdate({})
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')

    const [errorName, setErrorName] = useState('')

    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
        }
    }, [dataUpdate])

    const handleSubmitUpdate = async () => {
        let isName = checkName(name)
        if (isName) {
            let response = await updateSeatStatus(dataUpdate.id, name, token)
            if (response.statusCode === 0) {
                props.setCurrentPage(props.currentPage)
                toast.success(response.message);
                handleClose()
                await props.getListSeatStatusPaginate(props.currentPage)
            } else {
                toast.error(response.message);
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
                    <Modal.Title>CẬP NHẬT TRẠNG THÁI GHÉ</Modal.Title>
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

export default ModalUpdateSeatStatus;