import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/backgroud-admin.jpg';
import { BiSolidCameraMovie } from "react-icons/bi";
import { GiFilmProjector } from "react-icons/gi";
import { useNavigate, Link } from 'react-router-dom';
import { RiMovieLine } from "react-icons/ri";
import { FaTicketAlt } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { TbBrandTypescript } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { FaCartShopping } from "react-icons/fa6";
import { VscOutput } from "react-icons/vsc";
import { MdBloodtype } from "react-icons/md";
import { setCookie, removeCookie, getCookie } from '../Auth/CookieManager';
import { useEffect, useState } from 'react';
import { getPrincipal } from '../../services/AuthService';
// import { Link, useNavigate } from "react-router-dom";

const SideBar = (props) => {

    const { image, collapsed, toggled, handleToggleSidebar } = props
    const navigate = useNavigate()

    const [accountByToken, setAccountByToken] = useState({})

    const token = getCookie('cookie')
    useEffect(() => {
        getAccountByToken()
    }, [])

    const getAccountByToken = async () => {
        if (token === null || token === undefined) {
            return
        }
        let response = await getPrincipal(token)
        setAccountByToken(response)
    }

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <GiFilmProjector size={'5em'} color={'00bfff'} />
                        {/* <span
                            // onClick={() => navigate('/')}
                            style={{ cursor: "pointer" }}>
                            TTT Cinema
                        </span> */}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="round">
                        {accountByToken?.role?.name === 'Admin'
                            ?
                            <>
                                <MenuItem
                                    icon={<MdSpaceDashboard />} style={{ fontSize: '18px' }}
                                >
                                    Chung
                                    <Link to='/admin/manager-movie' />
                                </MenuItem>
                                <MenuItem
                                    icon={<RiMovieLine />} style={{ fontSize: '18px' }}
                                >
                                    Phim
                                    <Link to='/admin/manager-movie' />
                                </MenuItem>
                                <MenuItem
                                    icon={<MdBloodtype />} style={{ fontSize: '18px' }}
                                >
                                    Thể loại
                                    <Link to='/admin/manager-movieType' />
                                </MenuItem>
                                <MenuItem
                                    icon={<BiSolidCameraMovie />} style={{ fontSize: '18px' }}
                                >
                                    Rạp
                                    <Link to='/admin/manager-cinema' />
                                </MenuItem>
                                <MenuItem
                                    icon={<FaTicketAlt />} style={{ fontSize: '18px' }}
                                >
                                    Vé
                                    <Link to='/admin/manager-ticket' />
                                </MenuItem>
                                <MenuItem
                                    icon={<GrStatusInfo />} style={{ fontSize: '18px' }}
                                >
                                    Trạng thái ghế
                                    <Link to='/admin/manager-seatStatus' />
                                </MenuItem>
                                <MenuItem
                                    icon={<TbBrandTypescript />} style={{ fontSize: '18px' }}
                                >
                                    Loại ghế
                                    <Link to='/admin/manager-seatType' />
                                </MenuItem>
                                <MenuItem
                                    icon={<MdDiscount />} style={{ fontSize: '18px' }}
                                >
                                    Khuyến mãi
                                    <Link to='/admin/manager-promotion' />
                                </MenuItem>
                                <MenuItem
                                    icon={<RiDiscountPercentFill />} style={{ fontSize: '18px' }}
                                >
                                    Voucher
                                    <Link to='/admin/manager-voucher' />
                                </MenuItem>
                                <MenuItem
                                    icon={<FaUser />} style={{ fontSize: '18px' }}
                                >
                                    Tài khoản
                                    <Link to='/admin/manager-account' />
                                </MenuItem>
                            </>
                            :
                            <>
                            </>
                        }

                        <MenuItem
                            icon={<FaCartShopping />} style={{ fontSize: '18px' }}
                        >
                            Bán vé quầy
                            <Link to='/admin/manager-account' />
                        </MenuItem>

                        <MenuItem
                            icon={<VscOutput />} style={{ fontSize: '18px' }}
                        >
                            Hoá đơn
                            <Link to='/admin/manager-account' />
                        </MenuItem>
                    </Menu>

                    {/* <Menu iconShape="round">
                        <SubMenu
                            icon={<FaGem />}
                            title='Movie'
                        >
                            <MenuItem>
                                Moive Type
                            </MenuItem>
                            <MenuItem>
                                Food
                            </MenuItem>
                            <MenuItem>
                                Ticket
                            </MenuItem>
                        </SubMenu>
                    </Menu> */}
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <BiSolidCameraMovie />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                TTT Cinema
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar