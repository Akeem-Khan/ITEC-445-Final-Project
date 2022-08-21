import { useContext } from "react";
import AuthContext from "../../context/auth.context";
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import LogOutBtn from "../auth/logout-btn.component";
import logo from "../../logo.png";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import axios from "axios";
function Navbar() {
    const { user } = useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { getUser } = useContext(AuthContext);

    const history = useHistory();

    const logOut = async () => {
        await axios.get("http://localhost:4000/auth/logout");
        await getUser();
        history.push("/");
    }
    return (

        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} alt="IST" src={logo} />

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            IST - Department
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >


                                <Link to="/">
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Notices</Typography>
                                    </MenuItem>

                                </Link>




                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar><PersonIcon /></Avatar>

                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                {user !== undefined && (
                                    <>
                                        {user.loggedIn === false && (


                                            <>
                                                <MenuItem to="/register" component={RouterLink}>
                                                    <Typography textAlign="center">Register</Typography>
                                                </MenuItem>
                                                <MenuItem to="/login" component={RouterLink}>
                                                    <Typography textAlign="center">Log in</Typography>
                                                </MenuItem>

                                            </>
                                        )}

                                        {((user.role === 'student_leader') || (user.role === 'faculty')) && (
                                            <MenuItem to="/create" component={RouterLink}>
                                                <Typography textAlign="center">Create Notice</Typography>
                                            </MenuItem>

                                        )}

                                        {user.role === 'faculty' && (
                                            <MenuItem to="/confirm" component={RouterLink}>
                                                <Typography textAlign="center">Confirm student leader</Typography>
                                            </MenuItem>
                                        )}

                                        {user.loggedIn === true && (
                                            <>
                                                <MenuItem to="/chat" component={RouterLink}>
                                                    <Typography textAlign="center">Chat</Typography>
                                                </MenuItem>
                                                <MenuItem to="/profile" component={RouterLink}>
                                                    <Typography textAlign="center">My Profile</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={logOut}>
                                                    <Typography textAlign="center">Log Out</Typography>
                                                </MenuItem>

                                            </>
                                        )}
                                    </>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>

    );
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{textAlign: "left"}}>
            <a className="navbar-brand" href="https://www.costaatt.edu.tt" target="_blank">
                <img src={logo} width="30" height="30" alt="COSTAATT" />
            </a>
            <Link to="/" className="navbar-brand">IST - Department</Link>
        </div>
        
        <div className="collpase nav-collapse" style={{textAlign: "right"}}>
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Notices</Link>
                </li>

                {user !== undefined && (
                    <>
                        {user.loggedIn === false && (
                            <>
                                <li className="navbar-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">Log in</Link>
                                </li>

                                
                            </>
                        )}

                        {((user.role === 'student_leader') || (user.role === 'faculty')) && (
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Notice</Link>
                            </li>
                        )}

                        {user.role === 'faculty' && (
                            <li className="navbar-item">
                                <Link to="/confirm" className="nav-link">Confirm student leader</Link>
                            </li>
                        )}

                        {user.loggedIn === true && (
                            <>
                                <li className="navbar-item">
                                    <Link to="/cal" className="nav-link"> Booking Calendar</Link>
                                </li>
                                <li className="navbar-item">
                                    <LogOutBtn />
                                </li>
                                
                                <li className="navbar-item">
                                    <Link to="/profile" className="nav-link" style={{color: "#2E67FF"}}>&nbsp;{user.name}</Link>
                                </li>
                            </>
                        )}
                    </>
                )}
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;
