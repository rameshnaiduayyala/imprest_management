import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchUserData, userAuthentication } from "../../services/user.auth";
import LocalStorageService from "../../services/localStorage.svc";
import { Authentication } from "../../models/authentication.model";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({ userid: "", password: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (!login.userid) {
      setUsernameError("Please enter the username");
      return;
    }

    if (!login.password) {
      setPasswordError("Please enter the password");
      return;
    }

    const payload = {
      user_name: login.userid,
      password: login.password,
    };

    try {
      type Nullable<T> = T | null;
      const authentication: Nullable<string> = await userAuthentication(payload);
      if (authentication) {
        const userInfo: Nullable<Authentication> = await fetchUserData({token: authentication})
        const localStorageService = LocalStorageService.getInstance();
        localStorageService.setItem("loggedInTime", userInfo?.iat);
        localStorageService.setItem("expireTime", userInfo?.exp);
        localStorageService.setItem("token", authentication);
        localStorageService.setItem('user', userInfo?.userdata);
        localStorageService.setItem('roles', userInfo?.roles);
        toast.success("Login Success")
        navigate("/dashboard");
      }
    } catch (error) {
      setPasswordError("Invalid username and password");
    }
  };

  return (
    <div className="mmaindiv">
      <Box className="login_left_logo hide_at_xs_sm_device">
        <div className="logo_area">
          <Typography variant="h4" className="login_form">
            <h2>Mitte<br />
              <span>Analytics</span></h2>
          </Typography>
          <Typography variant="h4" className="login_form">
            <h4>
              <span>Imprest Stock Management</span></h4>
          </Typography>
        </div>
      </Box>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <Box className="login_form">
          <div className="logo_area show_at_xs_sm_device">
            <Typography variant="h4" className="login_form">
              <h2>Mitte<br />
                <span>Analytics</span></h2>
            </Typography>
            <Typography variant="h4" className="login_form">
              <h4>
                <span>Imprest Stock Management</span></h4>
            </Typography>
          </div>
          <div>
            <Typography variant="h4" className="login_form">
              Welcome Back
            </Typography>
            <Typography variant="h6" className="login">
              Login to get Started
            </Typography>
            <Box
              className="pl-5"
              component="form"
              noValidate
              onSubmit={submitForm}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userid"
                label="User Name"
                name="userid"
                autoComplete="userid"
                onChange={updateForm}
                helperText={usernameError}
                error={!!usernameError}
                value={login.userid}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={updateForm}
                autoComplete="current-password"
                value={login.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={passwordError}
                error={!!passwordError}
              ></TextField>

              <Link href="/forgotpass" className="forgotlink">
                Forgot password?
              </Link>
              <Button
                className="button"
                type="submit"
                variant="contained"
                startIcon={<LoginIcon className="loginIcon" />}
              >
                SIGN IN
              </Button>
            </Box>
          </div>
        </Box>
      </Container>

    </div>
  );
};
export default Login;