import './Signup.scss'
import Poster1 from '../../assets/poster1.jpg'
import Poster2 from '../../assets/poster2.jpg'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const Signup = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')

    const [showPassword, setShowPassword] = useState(false)

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

    const checkName = () => {
        if (name === '') {
            setErrorName('Chưa nhập tên')
            return false
        }
        setErrorName('')
        return true
    }

    const checkPhoneNumber = () => {
        let regexPhoneNumber = /^0\d{9}$/
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

    const handleSignupSubmit = (event) => {
        let isName = checkName()
        let isPhoneNumber = checkPhoneNumber()
        let isEmail = checkEmail()
        let isPassword = checkPassword()
        if (isName && isPhoneNumber && isEmail && isPassword) {
            //call api
        } else {
            event.preventDefault()
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-left">
                <div className='content-signup-left'>
                    <div className='title-left'>
                        NHỮNG BỘ PHIM HAY NHẤT TẠI TTT CINEMA
                    </div>
                    <div className='signup-poster'>
                        <div className='card-poster'>
                            <div className='content-poster'>
                                <div className='title-poster'>Thanh gươm diệt quỷ</div>
                                <div className='btn-ticket-signup'>
                                    <button>Mua vé</button>
                                </div>
                            </div>
                            <div className='img-poster'>
                                <img src={Poster1} />
                            </div>
                        </div>
                    </div>
                    <div className='signup-poster mt-5'>
                        <div className='card-poster'>
                            <div className='content-poster'>
                                <div className='title-poster'>Đại chiến Titan</div>
                                <div className='btn-ticket-signup'>
                                    <button>Mua vé</button>
                                </div>
                            </div>
                            <div className='img-poster'>
                                <img src={Poster2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signup-right">
                <div className='signup-content'>
                    <div className='title-signup'>
                        ĐĂNG KÝ
                    </div>
                    <div className='signup-form'>

                        <form>

                            <div className="mb-3 ">
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

                            <div className="mb-3 ">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Số điện thoại</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorPhoneNumber}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control" value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                />
                            </div>

                            <div className="mb-3 ">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Email</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorEmail}</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control" value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="mb-1 password-form">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className="form-label fw-bold">Mật khẩu</label>
                                    </div>
                                    <div>
                                        <span style={{ color: 'red' }}>{errorPassword}</span>
                                    </div>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    className="form-control input-password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                {showPassword ?
                                    <span onClick={() => setShowPassword(!showPassword)} className='show-password'><FaEye /></span>
                                    :
                                    <span onClick={() => setShowPassword(!showPassword)} className='show-password'><FaEyeSlash /></span>
                                }
                            </div>
                            <div className='border-signup-submit'>
                                <button className='submit-signup' onClick={(event) => handleSignupSubmit(event)}>
                                    ĐĂNG KÝ
                                </button>
                            </div>
                        </form>
                        <div className='no-account'>
                            Tôi đã có tài khoản? <span onClick={() => navigate('/login')} className='signin'>Đăng nhập</span>
                        </div>
                        <span className='go-home mt-3' onClick={() => navigate('/')}>
                            <IoMdArrowRoundBack />Quay về trang chủ
                        </span>

                        <div className='text-content-signup'>
                            Trang web được sản xuất và vận hành bởi TTT CINEMA, giám đốc chịu trách nhiệm ©TungTT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup