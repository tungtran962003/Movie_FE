import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { getCookie } from '../../../Auth/CookieManager';
import { deleteSeatStatus } from '../../../../services/SeatStatusService';

const ModalDeleteMovieType = (props) => {
    const { show, setShow, dataDelete, setDataDelete } = props;

    const [name, setName] = useState('')

    const handleClose = () => {
        setShow(false)
        setName('')
        setDataDelete({})
    }
    const handleShow = () => setShow(true);
    const token = getCookie('cookie')

    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            setName(dataDelete.name)
        }
    }, [dataDelete])

    const handleSubmitDelete = async () => {
        let response = await deleteSeatStatus(+dataDelete.id, token)
        if (response.statusCode === 0) {
            props.setCurrentPage(0)
            props.getListSeatStatusPaginate(0)
            toast.success(response.message)
            handleClose()
        } else {
            toast.error(response.message)
            handleClose()
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
                    <Modal.Title>XOÁ TRẠNG THÁI GHẾ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xoá trạng thái ghế <b>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-info' onClick={() => handleSubmitDelete()}>
                        <MdDelete style={{ fontSize: '23px', margin: '0 15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteMovieType;