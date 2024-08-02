import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { getCookie } from '../../../Auth/CookieManager';
import { deleteAccount } from '../../../../services/AccountService';

const ModalDeleteAccount = (props) => {
    const { show, setShow, dataDelete, setDataDelete } = props;

    const [email, setEmail] = useState('')

    const handleClose = () => {
        setShow(false)
        setEmail('')
        setDataDelete({})
    }
    const handleShow = () => setShow(true);
    const token = getCookie('cookie')

    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            setEmail(dataDelete.email)
        }
    }, [dataDelete])

    const handleSubmitDelete = async () => {
        let response = await deleteAccount(+dataDelete.id, token)
        if (response.statusCode === 0) {
            props.setCurrentPage(0)
            props.getListAccountPaginate(0)
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
                    <Modal.Title>XOÁ TÀI KHOẢN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xoá tài khoản có email là <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>
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

export default ModalDeleteAccount;