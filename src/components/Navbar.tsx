import React from 'react';
import { useNavigate } from 'react-router-dom';
// import CustomButton from '../controls/Button';
import {
  AppBar,
  Toolbar,
  MenuItem,
  Button,
  Grid,
  Typography,

} from '@mui/material';
import { AccountCircle, } from '@mui/icons-material';
import logo from "../images/Screenshot.png"
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStyles } from '../styles/NavbarStyles';
import { StyledMenu } from '../styles/NavbarStyles';
import ListofItems from "../components/ListofItems"
const ResponsiveAppBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const payload:any=localStorage.getItem('username')
  const user:any=JSON.parse(payload)
  console.log(user,"user")
  const handleLogout = () => {
    localStorage.removeItem("username")
    navigate('/');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClose = () => {
  };
  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);

return (
  <>
    <AppBar position="static" className={classes.customAppBar}>
      <Toolbar>
        <Grid container alignItems="center"
          justifyContent="flex-start" flexWrap='nowrap'>
          {/* Image */}
          <Grid item>
            <img src={logo} alt="hello" className={classes.img} />
          </Grid>
          <Typography className={classes.title}>Imprest Stock Management</  Typography>
        </Grid>  
        <Grid container className={classes.gridcontainer}>

          {/* <CustomButton color='inherit' onClick={() => navigate("/dashboard")}>Dashboard</CustomButton>
          <CustomButton color='inherit' onClick={() => navigate('/po')}>PO</CustomButton>
          <CustomButton color='inherit' onClick={() => navigate("/stock")}>Stock</CustomButton>
          <CustomButton color='inherit' onClick={() => navigate("/users")}>Users</CustomButton> */}

        <span style={{ fontSize: '17px' }}> 
         {user.user_name} 
        
        </span>
            <Button
              style={{ paddingLeft: '13px' }}
              color="inherit"
              aria-label="profile"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              startIcon={<AccountCircle />}

            >
          
              <KeyboardArrowDownIcon />
            </Button>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} disableRipple>
                <AccountCircle style={{ color: 'orange' }} />
                <Typography className='' style={{ color: 'orange' }}
                  onClick={handleLogout}>Profie</Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} disableRipple>
                <PowerSettingsNewOutlinedIcon style={{ color: 'red' }} />
                <Typography className='' style={{ color: 'red' }}
                  onClick={handleLogout}>Logout</Typography>
              </MenuItem>
            </StyledMenu>
          </Grid>
        
      </Toolbar>
    </AppBar>
    
    <div style={{ padding: '5px' }}>

<ListofItems/>

    </div>
    
</>
  );
};

export default ResponsiveAppBar;
