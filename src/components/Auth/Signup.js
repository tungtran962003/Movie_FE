import './Signup.scss'
import Poster1 from '../../assets/poster1.jpg'
import Poster2 from '../../assets/poster2.jpg'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import { FiRefreshCcw } from "react-icons/fi";
import { signup } from '../../services/AuthService';
import { toast } from 'react-toastify';

const Signup = (props) => {

    const navigate = useNavigate()
    const canvasRef = useRef(null);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState(null)
    const [birthDay, setBirthDay] = useState('')
    const [captcha, setCaptcha] = useState('')
    const [confirmCodeCaptcha, setConfirmCodeCaptcha] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorGender, setErrorGender] = useState('')
    const [errorBirthDay, setErrorBirthDay] = useState('')
    const [errorCaptcha, setErrorCaptcha] = useState('')
    const [errorConfirmCodeCaptcha, setErrorConfirmCodeCaptcha] = useState('')

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

    const checkGender = () => {
        if (gender === "" || gender === null) {
            setErrorGender('Chưa chọn giới tính')
            return false
        }
        setErrorGender('')
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

    const checkCaptcha = () => {
        if (confirmCodeCaptcha !== captcha) {
            setErrorConfirmCodeCaptcha('Mã xác nhận không khớp')
            // generateCaptcha()
            return false
        }
        setErrorConfirmCodeCaptcha('')
        return true
    }

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captchaText = '';
        for (let i = 0; i < 6; i++) {
            captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(captchaText);
        drawCaptcha(captchaText);
    };

    const drawCaptcha = (text) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '25px Arial';
        ctx.fillStyle = '#000';

        // Vẽ mã CAPTCHA
        ctx.fillText(text, 10, 30);

        // Thêm các đường gạch ngang ngẫu nhiên
        for (let i = 0; i < 5; i++) {
            drawRandomLine(ctx, canvas.width, canvas.height);
        }
    };

    const drawRandomLine = (ctx, width, height) => {
        const x1 = Math.floor(Math.random() * width);
        const y1 = Math.floor(Math.random() * height);
        const x2 = Math.floor(Math.random() * width);
        const y2 = Math.floor(Math.random() * height);
        ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSignupSubmit = async (event) => {
        let isName = checkName()
        let isPhoneNumber = checkPhoneNumber()
        let isEmail = checkEmail()
        let isPassword = checkPassword()
        let isGender = checkGender()
        let isBirthDay = checkBirthDay()
        let isCaptcha = checkCaptcha()
        if (isName && isPhoneNumber && isEmail && isPassword && isGender && isBirthDay) {
            let response = await signup(email, name, gender, birthDay, phoneNumber, password)
            if (response.statusCode === 1) {
                toast.error(response.message)
                return
            }
            toast.success(response.message)
            navigate("/login")
            // } else {
            //     event.preventDefault()
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
                                    <label className="form-label fw-bold">Giới tính</label>
                                </div>
                                <div>
                                    <span style={{ color: 'red' }}>{errorGender}</span>
                                </div>
                            </div>

                            <div className='d-flex'>
                                <div className="form-check me-4">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                        onChange={() => setGender(true)}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                        onChange={() => setGender(false)}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <label className="form-label fw-bold">Ngày sinh</label>
                                </div>
                                <div>
                                    <span style={{ color: 'red' }}>{errorBirthDay}</span>
                                </div>
                            </div>
                            <input type="date" className="form-control" value={birthDay}
                                onChange={(event) => setBirthDay(event.target.value)}
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

                        <div className="mb-4 password-form">
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

                        <div className="mb-3 ">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <label className="form-label fw-bold">Mã xác nhận</label>
                                </div>
                                <div>
                                    <span style={{ color: 'red' }}>{errorConfirmCodeCaptcha}</span>
                                </div>
                            </div>
                            <div className='w-100 d-flex justify-content-between'>
                                <input type="text" className="form-control w-50"
                                    onChange={(event) => setConfirmCodeCaptcha(event.target.value)}
                                />
                                <div className="captcha-container">
                                    <canvas ref={canvasRef} width="150" height="50" className="captcha-canvas" />
                                    <div className="captcha-refresh-button" onClick={generateCaptcha}><FiRefreshCcw /></div>
                                </div>
                            </div>
                        </div>

                        <div className='border-signup-submit'>
                            <button className='submit-signup' onClick={(event) => handleSignupSubmit(event)}>
                                ĐĂNG KÝ
                            </button>
                        </div>
                        <div className='no-account'>
                            Tôi đã có tài khoản? <span onClick={() => navigate('/login')} className='signin'>Đăng nhập</span>
                        </div>
                        <span className='go-home mt-3 mb-4' onClick={() => navigate('/')}>
                            <IoMdArrowRoundBack />Quay về trang chủ
                        </span>

                        {/* <div className='text-content-signup'>
                            Trang web được sản xuất và vận hành bởi TTT CINEMA, giám đốc chịu trách nhiệm ©TungTT
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup