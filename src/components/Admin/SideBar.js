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
import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'
// import { Link, useNavigate } from "react-router-dom";

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props
    const navigate = useNavigate()
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
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<RiMovieLine />}
                        >
                            Phim
                            <Link to='/admin/manager-movie' />
                        </MenuItem>
                        <MenuItem
                            icon={<BiSolidCameraMovie />}
                        >
                            Rạp
                            <Link to='/admin/manager-cinema' />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title='Movie'
                        >
                            <MenuItem>
                                Moive Type
                                {/* <Link to='/admins/manager-user' /> */}
                            </MenuItem>
                            <MenuItem>
                                Food
                                {/* <Link to='/admins/manager-quiz' /> */}
                            </MenuItem>
                            <MenuItem>
                                Ticket
                                {/* <Link to='/admins/manager-questions' /> */}
                            </MenuItem>
                        </SubMenu>
                    </Menu>
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