import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createFavourite } from '../../../../services/FavouriteService';
import { getAllMovie } from '../../../../services/MovieService';

const ModalCreateFavourite = (props) => {
    const { show, setShow, getListFavouritePaginate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')

        setErrorName('')
    }
    const handleShow = () => setShow(true);

    const [selectedFavourite, setSelectedFavourite] = useState({})
    const [listFavourite, setListFavourite] = useState([])

    const [errorSelectedFavourite, setErrorSelectedFavourite] = useState('')

    const token = getCookie('cookie')

    const getListMovie = async () => {
        let response = await getAllMovie(token)
        if (!_.isEmpty(response)) {
            let listSelectedFavourite = response.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setListFavourite(listSelectedFavourite)
        }
    }

    const checkSelectedFavourite = () => {
        if (_.isEmpty(selectedFavourite)) {
            setErrorSelectedFavourite('Chưa chọn phim')
            return false
        }
        setErrorSelectedFavourite('')
        return true
    }

    const handleSubmitCreate = async () => {
        let isSelectedFavourite = checkSelectedFavourite()
        if (isSelectedFavourite) {
            let response = await createFavourite(token)
            if (response.statusCode === 0) {
                await getListFavouritePaginate(0)
                props.setCurrentPage(0)
                toast.success(response.message)
                handleClose()
            } else {
                toast.error(response.message)
                handleClose()
            }
        }
    }

    useEffect(() => {
        getListMovie()
    }, [])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>THÊM PHIM YÊU THÍCH</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3 " >
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <label className="form-label fw-bold">Chọn phim</label>
                                </div>
                                <div>
                                    <span style={{ color: 'red' }}>{errorSelectedFavourite}</span>
                                </div>
                            </div>
                            <Select
                                value={selectedFavourite}
                                onChange={setSelectedFavourite}
                                options={listFavourite}
                                placeholder='Chọn phim yêu thích'
                            />
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

export default ModalCreateFavourite;