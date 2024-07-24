import './Login.scss'
import Poster1 from '../../assets/poster1.jpg'
import Poster2 from '../../assets/poster2.jpg'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import { login } from '../../services/AuthService'
import { toast } from 'react-toastify';
import { setCookie, getCookie, removeCookie } from './CookieManager';

const Login = (props) => {

    const navigate = useNavigate()

    const delay = 3000

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const [isLoading, setIsLoading] = useState(false)


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

    const handleLoginSubmit = async (event) => {
        let isEmail = checkEmail()
        let isPassword = checkPassword()
        if (isEmail && isPassword) {
            setIsLoading(true)
            let response = await login(email, password, delay)
            console.log(response);
            if (response.statusCode === 0) {
                setCookie('cookie', response.jwt)
                toast.success('Đăng nhập thành công, Chào mừng bạn đến với TTT Cinema')
                navigate('/')
                return
            }
            toast.error(response.message)
            setIsLoading(false)
            return
        } else {
            event.preventDefault()
        }
    }

    return (
        <div className="login-container">
            <div className="login-left">
                <div className='content-login-left'>
                    <div className='title-left'>
                        NHỮNG BỘ PHIM HAY NHẤT TẠI TTT CINEMA
                    </div>
                    <div className='login-poster'>
                        <div className='card-poster'>
                            <div className='content-poster'>
                                <div className='title-poster'>Thanh gươm diệt quỷ</div>
                                <div className='btn-ticket-login'>
                                    <button>Mua vé</button>
                                </div>
                            </div>
                            <div className='img-poster'>
                                <img src={Poster1} />
                            </div>
                        </div>
                    </div>
                    <div className='login-poster mt-5'>
                        <div className='card-poster'>
                            <div className='content-poster'>
                                <div className='title-poster'>Đại chiến Titan</div>
                                <div className='btn-ticket-login'>
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
            <div className="login-right">
                <div className='login-content'>
                    <div className='title-login'>
                        ĐĂNG NHẬP
                    </div>
                    <div className='login-form'>

                        <form>
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
                            <span className='forgot-password'>
                                Quên mật khẩu ?
                            </span>
                            <div className='border-login-submit'>
                                <button
                                    className='submit-login'
                                    onClick={(event) => handleLoginSubmit(event)}
                                    disabled={isLoading}>
                                    {isLoading === true && <ImSpinner9 className='icon-login' />}
                                    ĐĂNG NHẬP
                                </button>
                            </div>
                        </form>
                        <div className='no-account'>
                            Tôi chưa có tài khoản? <span onClick={() => navigate('/signup')} className='register'>Đăng ký</span>
                        </div>
                        <span className='go-home mt-3' onClick={() => navigate('/')}>
                            <IoMdArrowRoundBack />Quay về trang chủ
                        </span>

                        <div className='text-content-login'>
                            Trang web được sản xuất và vận hành bởi TTT CINEMA, giám đốc chịu trách nhiệm ©TungTT
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login