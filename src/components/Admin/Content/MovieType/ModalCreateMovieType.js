import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { createMovieType } from '../../../../services/MovieTypeService';
import { toast } from 'react-toastify';

const ModalCreateMovieType = (props) => {
    const { show, setShow, getListMoiveTypePaginate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')

        setErrorName('')
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')

    const [errorName, setErrorName] = useState('')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const handleSubmitCreate = async () => {
        let isName = checkName()
        if (isName) {
            debugger
            let response = await createMovieType(name)
            if (response === "ok") {
                console.log(typeof response);
                await getListMoiveTypePaginate(0)
                props.setCurrentPage(0)
                toast.success('New data created successfully')
                handleClose()
            } else {
                toast.error('Data already exists')
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
                    <Modal.Title>THÊM THỂ LOẠI PHIM</Modal.Title>
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
                    <Button variant="primary" className='btn-info' onClick={() => handleSubmitCreate()}>
                        <RiAddBoxFill style={{ fontSize: '25px', margin: '0 15px' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateMovieType;