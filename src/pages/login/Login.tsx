import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../assets/image.png";
import axios from "axios";
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

const Login: React.FC = () => {
  const navigate = useNavigate();

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
  console.log("hello");
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError(""); // Clear previous username error message
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
      user_name: inputField.userid,
      password: inputField.password,
    };

    try {
      navigate("/dashboard");
      const response = await axios.post(
        "http://localhost:5000/api/user/users_login",
        payload
      );
      console.log(response, "Response");
      if (response.status === 200) {
        toast.success("Login successfull");

        console.log(response.data.data);
      }
    } catch (error) {
      setPasswordError("Invalid username and password");
    }
  };

  return (
    <div className="mmaindiv">
      <img
        src={loginImage}
        alt="Login"
        style={{ width: "50%", height: "100vh" }}
      />
      <Container component="main" maxWidth="xs">
        <ToastContainer />

        <Box className="login_form">
          <div>
            <Typography variant="h4" className="login_form">
              Welcome Back
            </Typography>
            <Typography variant="h6" className="login">
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
      {/* <Footer/> */}
    </div>
  );
};
export default Login;
