import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import { deleteMovieType } from '../../../../services/MovieTypeService';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";

const ModalDeleteMovieType = (props) => {
    const { show, setShow, dataDelete, setDataDelete } = props;

    const handleClose = () => {
        setShow(false)
        setName('')

        setDataDelete({})
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')

    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            setName(dataDelete.name)
        }
    }, [dataDelete])

    const handleSubmitDelete = async () => {
        let response = await deleteMovieType(+dataDelete.id)
        debugger
        if (response === "ok") {
            props.setCurrentPage(0)
            props.getListMoiveTypePaginate(0)
            handleClose()
            toast.success('Deleted data successfully')
        } else {
            handleClose()
            toast.error('Data delete failed')
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
                    <Modal.Title>XOÁ THỂ LOẠI PHIM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xoá thể loại phim <b>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b>
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