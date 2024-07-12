import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { RiMovie2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie, removeCookie } from '../../Auth/CookieManager';
import { useEffect, useState } from 'react';
import { getPrincipal } from '../../../services/AuthService';
import { FaUser } from "react-icons/fa";
import './Header.scss'

const Header = (props) => {

    const navigate = useNavigate()

    const [accountByToken, setAccountByToken] = useState({})

    const [collapsed, setCollapsed] = useState(false)

    const token = getCookie('cookie')
    useEffect(() => {
        getAccountByToken()
    }, [token])

    const getAccountByToken = async () => {
        if (token === null || token === undefined) {
            return
        }
        let response = await getPrincipal(token)
        setAccountByToken(response)
    }

    return (
        <div className="header-container">
            {token === null || token === undefined ?
                <>
                    <div className='option-header-account'>
                        <div onClick={() => navigate('/login')} className='login'>Đăng nhập</div>
                        <div className='mx-2'>||</div>
                        <div onClick={() => navigate('/signup')} className='signup'>Đăng ký</div>
                    </div>
                </>
                :
                <>
                    <div className='option-header-account'>
                        <div className='hello'>Xin chào {accountByToken?.name}</div>
                        <div className="dropdown-option-account">
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                menuVariant="dark"
                                className='no-caret signup'
                                title={<FaUser />}
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                {accountByToken?.role?.name === 'Admin' || accountByToken?.role?.name === 'Staff' ?
                                    <NavDropdown.Item onClick={() => navigate('/admin')}>
                                        Quản lý
                                    </NavDropdown.Item>
                                    :
                                    <></>
                                }

                                <NavDropdown.Item href="">
                                    Thông tin cá nhân
                                </NavDropdown.Item>
                                <NavDropdown.Item href="">Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                </>
            }

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className='text-uppercase'>
                    <NavLink to="/" className='navbar-brand d-flex align-items-center '>
                        <RiMovie2Fill className='me-1' />
                        TTT Cinema
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex justify-content-between">
                            <NavLink to="/" className='nav-link'>Trang chủ</NavLink>
                            <NavLink to="/movie" className='nav-link'>Phim</NavLink>
                            <NavLink to="/cinema" className='nav-link'>Rạp</NavLink>
                            <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                        </Nav>
                        {/* <Nav className='d-flex align-items-center'>
                            <NavLink to="/" className='nav-link'>Đăng nhập</NavLink>
                            <NavLink to="/" className='nav-link'>Đăng ký</NavLink> */}
                        {/* <button className='btn-login'>Đăng nhập</button> */}
                        {/* <button className='btn-signup me-2'>Đăng ký</button> */}
                        {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    Thông tin cá nhân
                                </NavDropdown.Item>
                                <NavDropdown.Item >Quản lý</NavDropdown.Item>
                                <NavDropdown.Item >
                                    Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        {/* </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header