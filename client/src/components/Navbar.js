import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import Menu from '@mui/material/Menu';
import { makeStyles, Tooltip } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
const useStyle = makeStyles(theme => ({
  component: {
    background: '#F5EBEB !important',
    color: 'black !important',
    height: '13vh'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: 40,
    marginRight: 20,
    padding: 10
  },
  menuicon: {
    color: 'black'
  },
  linklogohome: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '12px'
  }
}))
const Navbar = () => {
  const history = useHistory();
  const classes = useStyle();
  const user = useSelector((state) => state.user.currentUser);
  const userprofile = useSelector((state) => state.userprofile.currentUserprofile);
  const [avatar, setAvatar] = useState('');
  const imgbefore = `http://localhost:8000/${avatar.slice(7,)}`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8000/userprofile/${user.id}`);
      setAvatar(response.data.userprofile.picture);
    }
    fetchData();
  }, [userprofile])
  function logout() {
    localStorage.clear();
    history.push('/login')
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar className={classes.component}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/' className={classes.linklogohome}>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <img src={logo} height={90} width={120} />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon className={classes.menuicon} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                HOME</MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleClose}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                ABOUT</MenuItem>
                <MenuItem component={Link} to="/contact" onClick={handleClose}>
                <PhoneIcon>
                  <InfoIcon fontSize="small" />
                </PhoneIcon>
                CONTACT</MenuItem>
              {
                user ?
                  <>
                    <MenuItem component={Link} to="/createuserprofile" onClick={handleClose}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      PROFILE</MenuItem>
                    <MenuItem component={Link} onClick={logout} to="/login" >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      LOGOUT</MenuItem>
                  </> :
                  <>
                    <MenuItem component={Link} to="/login" onClick={handleClose}>
                      <ListItemIcon>
                        <LoginIcon fontSize="small" />
                      </ListItemIcon>
                      LOGIN</MenuItem>
                    <MenuItem component={Link} to="/register" onClick={handleClose}>
                      <ListItemIcon>
                        <HowToRegIcon fontSize="small" />
                      </ListItemIcon>
                      REGISTER</MenuItem>
                  </>
              }
            </Menu>
          </Box>
          <Link to='/' className={classes.linklogohome}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <img src={logo} height={90} width={120} />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/' className={classes.link}>
              <Typography>HOME</Typography>
            </Link>
            <Link to='/about' className={classes.link}>
              <Typography>ABOUT</Typography>
            </Link>
            <Link to='/contact' className={classes.link}>
              <Typography>CONTACT</Typography>
            </Link>
            {user ?
              <>
                <Link to='/createuserprofile' className={classes.link}>
                  <Typography>PROFILE</Typography>
                </Link>
                <Link onClick={logout} to='/login' className={classes.link}>
                  <Typography>LOGOUT</Typography>
                </Link>
                <Avatar alt="No Avatar" src={imgbefore} sx={{ display: 'none' }} />
              </> :
              <>
                <Link to='/login' className={classes.link}>
                  <Typography>LOGIN</Typography>
                </Link>
                <Link to='/register' className={classes.link}>
                  <Typography>REGISTER</Typography>
                </Link>
              </>
            }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ?
              <>
                <Link to='/createuserprofile' className={classes.link}>
                  <Tooltip title={user.name.toUpperCase()}>
                    <Avatar src={imgbefore} sx={{
                      display: 'inline-block',
                      width: 50,
                      height: 50,
                    }} />
                  </Tooltip>
                </Link>
              </>
              :
              <Link to='/login' className={classes.link}>
                <Typography><AccessibilityNewIcon /></Typography>
              </Link>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;