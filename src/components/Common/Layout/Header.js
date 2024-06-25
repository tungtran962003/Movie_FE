import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { RiMovie2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const navigate = useNavigate()

    return (
        <div className="header-container">
            <div className='option-header-account'>
                <div onClick={() => navigate('/login')} className='login'>Đăng nhập</div>
                <div className='mx-2'>||</div>
                <div onClick={() => navigate('/signup')} className='signup'>Đăng ký</div>
            </div>
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