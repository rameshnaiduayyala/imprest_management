import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Menuitems from "../topbar/Topbar";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import EmailIcon from "@mui/icons-material/Email";
import Badge from "@mui/material/Badge";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Button,
  Grid,
  Typography,
  Menu,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    navigate("/");
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className="customAppBar">
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            flexWrap="nowrap"
          >
            <Grid item className="img">
              <img src={logo} alt="hello" className="img" />
            </Grid>

            <Typography className="title" variant="h5">
              Imprest Stock Management
            </Typography>
          </Grid>
          <Grid container className="gridcontainer">
            <div className="alerts">
              <Badge badgeContent={4} color="primary">
                <EmailIcon />
              </Badge>
              <Badge badgeContent={6} color="primary">
                <AddAlertIcon />
              </Badge>
            </div>

            <span className="login_person">Ramesh Ayyala</span>
            <Button
              style={{ paddingLeft: "13px" }}
              color="inherit"
              aria-label="profile"
              aria-controls="profile-menu"
              aria-haspopup="true"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon className="icon" />
            </Button>
            <Menu
              id="icon-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
      <Menuitems />
    </>
  );
};

export default Navbar;
