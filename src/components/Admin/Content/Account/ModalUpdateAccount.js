import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getCookie } from '../../../Auth/CookieManager';
import { createAccount, updateAccount } from '../../../../services/AccountService';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Select from 'react-select';
import { getAllRankCustomer } from '../../../../services/RankCustomerService';
import { FaPenSquare } from "react-icons/fa";
import _ from 'lodash'
import { getAllRole } from '../../../../services/RoleService';

const ModalUpdateAccount = (props) => {
    const { show, setShow, getListAccountPaginate, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        setShow(false)
        setName('')
        setEmail('')
        setPassword('')
        setGender('')
        setBirthDay('')
        setPhoneNumber('')
        setSelectedRankCustomer('')
        setSelectedRole('')
        setAvatar('')
        setPreviewAvatar('')

        setErrorName('')
        setErrorEmail('')
        setErrorPassword('')
        setErrorGender('')
        setErrorPhoneNumber('')
        setErrorBirthDay('')
        setErrorRankCustomer('')
        setErrorRole('')

        setDataUpdate({})
    }
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState(true)
    const [birthDay, setBirthDay] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectedRankCustomer, setSelectedRankCustomer] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [listRankCustomer, setListRankCustomer] = useState([])
    const [listRole, setListRole] = useState([])
    const [avatar, setAvatar] = useState('')
    const [previewAvatar, setPreviewAvatar] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorGender, setErrorGender] = useState('')
    const [errorBirthDay, setErrorBirthDay] = useState('')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorRankCustomer, setErrorRankCustomer] = useState('')
    const [errorRole, setErrorRole] = useState('')
    const [errorAvatar, setErrorAvatar] = useState('')


    const token = getCookie('cookie')

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const checkEmail = () => {
        if (email === '') {
            setErrorEmail('Chưa nhập email')
            return false
        }
        if (!validateEmail(email)) {
            setErrorEmail('Email sai định dạng')
            return false
        }
        setErrorEmail('')
        return true
    }

    const checkPassword = () => {
        if (password === '') {
            setErrorPassword('Chưa nhập mật khẩu')
            return false
        }
        setErrorPassword('')
        return true
    }

    const checkPhoneNumber = () => {
        let regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        if (phoneNumber === '') {
            setErrorPhoneNumber('Chưa nhập số điện thoại')
            return false
        }
        if (!regexPhoneNumber.test(phoneNumber)) {
            setErrorPhoneNumber('Số điện thoại sai định dạng')
            return false
        }
        setErrorPhoneNumber('')
        return true
    }

    const checkBirthDay = () => {
        if (birthDay === '') {
            setErrorBirthDay('Chưa chọn ngày sinh')
            return false
        }
        setErrorBirthDay('')
        return true
    }

    const checkSelectedRankCustomer = () => {
        if (_.isEmpty(selectedRankCustomer)) {
            setErrorRankCustomer('Chưa chọn hạng người dùng')
            return false
        }
        setErrorRankCustomer('')
        return true
    }


    const getListRankCustomer = async () => {
        let response = await getAllRankCustomer(token)
        if (!_.isEmpty(response)) {
            let listSelectedRankCustomer = response.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setListRankCustomer(listSelectedRankCustomer)
        }
    }

    const checkSelectedRole = () => {
        if (_.isEmpty(selectedRole)) {
            setErrorRole('Chưa chọn quyền người dùng')
            return false
        }
        setErrorRole('')
        return true
    }


    const getListRole = async () => {
        let response = await getAllRole(token)
        if (!_.isEmpty(response)) {
            let listRole = response.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setListRole(listRole)
        }
    }

    const checkAvatar = () => {
        if (avatar.size > 1024 * 1024) {
            setErrorAvatar('Vui lòng chọn ảnh dưới 1MB')
            return false
        }
        setErrorAvatar('')
        return true
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewAvatar(URL.createObjectURL(event.target.files[0]))
            setAvatar(event.target.files[0])
        }
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm số 0 vào trước nếu cần
        const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 vào trước nếu cần

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getListRankCustomer()
        getListRole()
    }, [])

    console.log(dataUpdate);

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setEmail(dataUpdate.email)
            setPassword(dataUpdate.password)
            setPhoneNumber(dataUpdate.phoneNumber)
            setBirthDay(formatDate(dataUpdate.birthDay))
            setSelectedRankCustomer(
                {
                    value: dataUpdate.rankCustomer.id,
                    label: dataUpdate.rankCustomer.name
                }
            )
            setSelectedRole(
                {
                    value: dataUpdate.role.id,
                    label: dataUpdate.role.name
                }
            )
            if (dataUpdate.gender) {
                document.getElementById('flexRadioDefault1').checked = 'true'
            } else {
                document.getElementById('flexRadioDefault2').checked = 'true'
            }
        }
    }, [dataUpdate])

    const handleSubmitUpdate = async () => {
        let isName = checkName()
        let isEmail = checkEmail()
        let isPassword = checkPassword()
        let isBirthDay = checkBirthDay()
        let isPhoneNumber = checkPhoneNumber()
        let isAvatar = checkAvatar()
        let isRankCustomer = checkSelectedRankCustomer()
        let isRole = checkSelectedRole()
        if (isName && isEmail && isPassword && isBirthDay && isPhoneNumber && isAvatar && isRankCustomer && isRole) {
            let response = await updateAccount(dataUpdate.id, name, email, password, gender, birthDay, phoneNumber, avatar, selectedRankCustomer.value, selectedRole.value, token)
            if (response.statusCode === 0) {
                await getListAccountPaginate(0)
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
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>CẬP NHẬT TÀI KHOẢN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='d-flex w-100 justify-content-between'>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Tên</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorName}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control" value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Email</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorEmail}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='d-flex w-100 justify-content-between'>
                            <div className="mb-3 password-form" style={{ width: '48%' }}>

                                <div className="mb-4 " >
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <label className="form-label fw-bold">Giới tính</label>
                                        </div>
                                        <div>
                                            <span style={{ color: 'red' }}>{errorGender}</span>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="form-check me-5">
                                            <input className="form-check-input" type="radio" id="flexRadioDefault1" name='gender'
                                                value={true} onChange={(event) => setGender(event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Nam
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" id="flexRadioDefault2" name='gender'
                                                value={false} onChange={(event) => setGender(event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Số điện thoại</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorPhoneNumber}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='d-flex w-100 justify-content-between'>
                            <div style={{ width: '48%' }}>
                                <div className="mb-3 " >
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <label className="form-label fw-bold">Hạng người dùng</label>
                                        </div>
                                        <div>
                                            <span style={{ color: 'red' }}>{errorRankCustomer}</span>
                                        </div>
                                    </div>
                                    <Select
                                        value={selectedRankCustomer}
                                        onChange={setSelectedRankCustomer}
                                        options={listRankCustomer}
                                        placeholder='Chọn thể hạng người dùng'
                                    />
                                </div>

                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className="mb-3" >
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <label className="form-label fw-bold">Ngày sinh</label>
                                        </div>
                                        <div>
                                            <span style={{ color: 'red' }}>{errorBirthDay}</span>
                                        </div>
                                    </div>
                                    <input type="date" className="form-control"
                                        value={birthDay}
                                        onChange={(event) => setBirthDay(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='d-flex w-100 justify-content-between'>
                            <div style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Quyền người dùng</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorRole}</span>
                                    </div>
                                </div>
                                <Select
                                    value={selectedRole}
                                    onChange={setSelectedRole}
                                    options={listRole}
                                    placeholder='Chọn quyền người dùng'
                                />
                            </div>
                            <div className="mb-3 " style={{ width: '48%' }}>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Avatar</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorAvatar}</span>
                                    </div>
                                </div>
                                <div>
                                    {previewAvatar ?
                                        <label className='label-upload' htmlFor='labelUpload'>
                                            <img src={previewAvatar} />
                                        </label>
                                        :
                                        <label className='label-upload' htmlFor='labelUpload'>
                                            <img src={`http://localhost:8080/image/account/${dataUpdate.id}`} />
                                        </label>
                                    }

                                    <input
                                        hidden
                                        id='labelUpload'
                                        type="file"
                                        onChange={(event) => handleUploadImage(event)}
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-info' onClick={() => handleSubmitUpdate()}>
                        <FaPenSquare style={{ fontSize: '25px', margin: '0 15px' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateAccount;