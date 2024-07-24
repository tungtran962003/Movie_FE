import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from "react-router-dom";
import { useNavigate, Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getCookie, setCookie, removeCookie } from "../Auth/CookieManager";
import { logout } from "../../services/AuthService";

const Admin = (props) => {

    const [collapsed, setCollapsed] = useState(false)

    const navigate = useNavigate()

    const token = getCookie('cookie')

    const handleLogout = async () => {
        if (token === null || token === undefined) {
            return
        }
        let response = await logout(token)
        console.log(response);
        navigate('/login')
        removeCookie('cookie')
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <div className="icon-collapsed" onClick={() => setCollapsed(!collapsed)}>
                        <FaBars />
                    </div>
                    <div className="admin-option-header">
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Cài đặt"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={() => navigate('/')}>
                                Trang chủ
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Thông tin cá nhân
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <PerfectScrollbar>
                    <div>
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Admin