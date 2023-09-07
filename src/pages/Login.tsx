import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../images/image.png";
import axios from "axios";

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
import { useStyles } from "../styles/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [inputField, setInputField] = useState({ userid: "", password: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInputField((prev) => ({ ...prev, [name]: value }));
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (!inputField.userid) {
      setUsernameError("Please enter the username");
      return;
    }

    if (!inputField.password) {
      setPasswordError("Please enter the password");
      return;
    }

    const payload = {
      username: inputField.userid,
      password: inputField.password,
    };

    try {
      const response = await axios.post("https://rameshayyala.vercel.app/users", payload);
      console.log(response, "response");
      if (response.status == 200) {
        toast.success("Login successful "+response.data);
        console.log("Login successful "+response.data.username)
        localStorage.setItem("username", JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      setPasswordError("Invalid username and password");
    }
  };

  return (
    <div className={classes.mmaindiv}>
      <img
        src={loginImage}
        alt="Login"
        style={{ width: "50%", height: "100vh" }}
      />
      <Container component="main" maxWidth="xs">
        <ToastContainer />

        <Box className={classes.login_form}>
          <div>
            <Typography variant="h4" className={classes.login_form}>
              Welcome Back
            </Typography>
            <Typography variant="h6" className={classes.login}>
              Login to get Started
            </Typography>
            <Box
              className="main"
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
                value={inputField.userid}
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
                value={inputField.password}
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

              <Link href="/forgotpass" className={classes.forgotlink}>
                Forgot password?
              </Link>
              <Button
                style={{ width: "25rem", height: "3rem", marginTop: "30px" }}
                type="submit"
                variant="contained"
                startIcon={<LoginIcon style={{ color: "white" }} />}
              >
                SIGN IN
              </Button>
            </Box>
          </div>
        </Box>
      </Container>
      {/* <Footer/> */}
    </div>
  );
};
export default Login;
