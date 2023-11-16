import React, { useState, ReactNode, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../sidebar/sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GradingIcon from '@mui/icons-material/Grading';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import InventoryIcon from "@mui/icons-material/Inventory";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Tooltip, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import LocalStorageService from '../../services/localStorage.svc';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';

interface MenuItem {
    path: string;
    name: string;
    icon: JSX.Element;
}

export interface SidebarProps {
    children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localStorageService: any = LocalStorageService.getInstance();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const roles: any = localStorageService.getItem("roles") ?? [];
    const authed: boolean =
        roles?.filter((val: Role) => val?.name?.toLowerCase() === "admin")?.length >
        0;
    const [isOpen, setOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const [isNameVisible, setNameVisibility] = useState(false);
    const [alertTriggered, setAlertTriggred] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timerId: any;

        if (localStorageService.getItem("expireTime") && alertTriggered === false) {
            timerId = setInterval(() => {
                if ((new Date(localStorageService.getItem("expireTime") * 1000).getTime() === new Date().getTime() || new Date(localStorageService.getItem("expireTime") * 1000).getTime() < new Date().getTime()) && alertTriggered === false) {
                    setAlertTriggred(true)
                }
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [alertTriggered, localStorageService, navigate])

    useEffect(() => {
        if (alertTriggered) {
            confirmAlert({
                title: 'Session expired',
                message: 'Your session has expired. Please log in',
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {
                            localStorageService.removeItem("token");
                            localStorageService.removeItem("user");
                            localStorageService.removeItem("roles");
                            localStorageService.removeItem("currentTime");
                            navigate("/");
                        }
                    }
                ]
            });
        }
    }, [alertTriggered])


    const getLoginUserName = () => {
        const user: User = JSON.parse(localStorage.getItem("user") as any);
        return user.first_name + " " + user.last_name;
    };

    const toggle = () => {
        setOpen(!isOpen);
        setNameVisibility(!isNameVisible);
    };

    const LoginUserName: string = getLoginUserName();

    const handleLogout = () => {
        confirmAlert({
            title: 'Confirm to Logout',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorageService.removeItem("token");
                        localStorageService.removeItem("user");
                        localStorageService.removeItem("roles");
                        localStorageService.removeItem("currentTime");
                        navigate("/");
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const menuItems: MenuItem[] = authed ?
        [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: <DashboardIcon />,
            },
            {
                path: '/users',
                name: 'Users',
                icon: <GroupAddIcon />,
            },
            {
                path: '/imprestlist',
                name: 'Imprest',
                icon: <AddToQueueIcon />,
            },
            {
                path: '/rolelist',
                name: 'Roles',
                icon: <CoPresentIcon />,
            },
            {
                path: '/productlist',
                name: 'Products',
                icon: <InventoryIcon />,
            },
            {
                path: '/userrole',
                name: 'Assigned Roles',
                icon: <ManageAccountsIcon />,
            },
            {
                path: '/imprestproductlist',
                name: 'Imprest Products',
                icon: <GradingIcon />,
            },
        ] :

        [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: <DashboardIcon />,
            },
            {
                path: '/imprestlist',
                name: 'Imprest',
                icon: <AddToQueueIcon />,
            },
            {
                path: '/productlist',
                name: 'Products',
                icon: <InventoryIcon />,
            },
            {
                path: '/imprestproductlist',
                name: 'Imprest Products',
                icon: <GradingIcon />,
            },
        ];

    return (
        <>
            <div className='container'>
                <div className={isOpen ? 'sidebar' : 'sidenav'}>
                    <div className="top-section">
                        <div className="bars">
                            <MenuIcon onClick={toggle} style={{ cursor: 'pointer' }} />

                        </div>
                        {isNameVisible && <Typography variant='h6' className="logo">MA</Typography>}
                    </div>
                    <nav>
                        <div className='top-menu'>
                            {menuItems.map((item, index) => (
                                <Tooltip title={item.name} placement="right" key={index} arrow>
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        className={`link ${activeLink === item.path ? 'active' : ''}`}
                                        onClick={() => setActiveLink(item.path)}
                                    >
                                        <div className="icon">{item.icon}</div>
                                        {isOpen ? <div className="link-text">{item.name}</div> : null}
                                    </NavLink>
                                </Tooltip>
                            ))}
                        </div>
                        <div className='bottom-menu'>
                            <div className="dropdown">
                                <div className="profile">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAtFJREFUSEu1lUmozWEYxn+PYWXIQrjmYYOrXPO4EVlQolDYkCJDsWFByCwpLJQyJSUhZV6QjSEyjzdlDhElIiV59ej7n/7n3HPutbnf5pz+3/t9z/s87/O+n2jkpUa+n3oBIqIJMBEYCgwABqeEbgF3gevAeUl/KiVaESAiugGHgZENsLwGzJT0ulxcWYCImAvsBFoAN4CDwBPgcbqkH9AXmA0MAX4ASyTtKwWpAxARc4D9wC9gLbClkgRJwhXAaqC5ASU5mcIqAoiIrsAjoCUwWpLpExGdgb3AiHTyCjBf0tu0Pwq4DHw3s+y79woAEeH/vnA4sF6Ss/LlHYH7QNsS+p+AGknvU9xGwGwuSRqbxeYB7BTr/RAYKOl3OngUmJYYrAGaAv51nY5Jmp7imgF2V/903i4rYrAU2A7Mk7QnyyAivgBtgC45SXoCz4GPkjrkYhcCu4DFkvxbBJBlau2v5g59BNoBPSW9TNlWAhhjiWxvSbNKAd44SxdYkm33b0VEBmxW61JSdpfddkTSjFxse+AD8EpSj1KAb0AroEqSgzKAKuAOUJAibbm4rpUZZrE2xDvgqyTLWiRRLdDbo0HSubxjIqI1sBww7QAOAVvzTBPbScBJ4IEkF7sI4EDqzJWSNuWystPs85qcVT+nWXRNkgEzBpbO9t4taUEpwATgLOBCVkv6GRHVwCkXOM8o9/8ZMElSbUS4OT1OXMfxki6UAtjf9rEztV1XAb7A2lvXiy5eurw7MA7oBLgWvYBtwCLgJjAsY1Y6KrJm8z3HganAbUnZmC4knzrfzWSts1iP7UGS7mWB5YbdSmBDTgZLcLqcRBExBTiR21smyUwKq9K4tt8tkZfd5THsBnoB+BHKJHIv9ElxKyRtLk2kvgfHsuxIDqpQ43+f3fVLJbl+dVaDb3JETE7PpnvErrLOfnie2mGSztSH3iBAfYf/Z6/RAf4Cnl4OKA9PwIwAAAAASUVORK5CYII=" />
                                    <div className="dropdown-content">
                                        <ul>
                                            <li><i className='bx bx-user' ></i><span>{LoginUserName}</span></li>
                                            <li><i className='bx bx-bell'></i><span>Notifications</span></li>
                                            <li><i className='bx bx-message-alt-detail'></i><span>Messages</span></li>
                                            <li><i className='bx bx-help-circle'></i><span>Help</span></li>
                                            <li onClick={handleLogout}><i className='bx bx-log-out-circle'></i><span>Logout</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <main className='pages global_page_spacing'>{children}
                </main>
            </div>
        </>
    );
};

export default Sidebar;