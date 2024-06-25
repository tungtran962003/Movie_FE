import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from "react-router-dom";
import { useNavigate, Link } from 'react-router-dom';

const Admin = (props) => {

    const [collapsed, setCollapsed] = useState(false)

    const navigate = useNavigate()

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
                            <NavDropdown.Item href="#action/3.2">
                                Thông tin cá nhân
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin