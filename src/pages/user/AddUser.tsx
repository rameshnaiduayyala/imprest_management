import { Grid, Box } from "@mui/material";
import { FormEvent, useState } from "react";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { createUser, getusers } from "../../services/user.svc";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./addUser.css";
import { User } from "../../models/user.model";
import { ToastContainer, toast } from "react-toastify";


const AddUser = () => {

  const navigate = useNavigate();
  const initialUserState: User = {

    user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    active: true

  };

  const [userdata, setUserData] = useState<User>(initialUserState);
  const [errors, setErrors] = useState<User>(initialUserState);
  const [emailValid, setEmailValid] = useState(true);

  const isEmailValid = (email: string) => {

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };
  const handleChange = (name: string, value: string | number) => {
    const newErrors = { ...errors } as any;

    if (name === "email") {
      setEmailValid(isEmailValid(value as string));
      if (!isEmailValid(value as string)) {
        newErrors.email = "Enter a valid email";
      } else {
        newErrors.email = "";
      }
    } else if (name === "phone_number") {
      if (!/^\d{10}$/.test(value as string)) {
        newErrors.phone_number = "Mobile number should be exactly 10 digits";
      } else {
        newErrors.phone_number = "";
      }
    } else if (name !== "middle_name") {
      if (value === "") {
        newErrors[name] = `${name} is required`;
      } else {
        newErrors[name] = "";
      }
    }

    setUserData((prevUserData: any) => ({
      ...prevUserData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name],
    }));
  };

  const handleMobileNumberInput = (e: any) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    e.target.value = sanitizedInput;
    handleChange("phone_number", sanitizedInput);
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    const newErrors = { ...errors } as any;
    for (const key in userdata) {
      if (userdata.hasOwnProperty(key)) {
        if (key !== "middle_name" && userdata[key as keyof User] === "") {
          const fieldName = key.replace(/_/g, ' ');
          newErrors[key as keyof User] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`; // Capitalize the first letter
          isValid = false;
        }
      }
    }

    if (!emailValid) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      const users = await getusers();
      const usernameExists = users.some((user: any) => user.user_name === userdata.user_name);
      if (usernameExists) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          user_name: "Username already exists",
        }));
      } else {
        try {
          const createdUser = await createUser(userdata);
          if (createdUser) {
            toast.success("User created successfully");
            setTimeout(() => {
              navigate("/users");
            }, 1000);
            setUserData(initialUserState)
          }
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    }
  };



  const handleCancel = () => {
    navigate("/users");
  };


  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area" style={{ display: 'flex' }}>
        <h2 className="page_main_title">
          Add User
        </h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              startIcon={<PersonAddIcon />}
              type="submit"
              onClick={(e) => handleSubmit(e as any)}
            >
              <span>Submit</span>
            </CustomButton>
            <CustomButton

              className=""
              startIcon={<CancelIcon className="button_icon" />}
              onClick={handleCancel}
            >
              <span>Cancel</span>
            </CustomButton>
          </div>
        </div>
      </div>
      <Box
        className="common_container"
        component="form"
      >
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>


            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={userdata.first_name}
                onChange={(value) => handleChange("first_name", value)}
                type="text"
                placeholder="First Name"
                label={"First Name"}
                name="first_name"
                error={!!errors.first_name}
                helperText={errors.first_name}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Middle Name"
                value={userdata.middle_name as string}
                onChange={(value) => handleChange("middle_name", value)}
                type="text"
                label={"Middle Name"}
                name="Middle Name"

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Last Name"
                value={userdata.last_name}
                onChange={(value) => handleChange("last_name", value)}
                type="text"
                label={"Last Name"}
                name="last_name"
                error={!!errors.last_name}
                helperText={errors.last_name}
                required={true}
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={userdata.user_name}
                onChange={(value) => handleChange("user_name", value)}
                name="user_name"
                label={"User Name"}
                type="text"
                autoFocus={true}
                error={!!errors.user_name}
                helperText={errors.user_name}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Mobile Number"
                value={userdata.phone_number}
                type="text"
                onChange={(value) => handleChange("phone_number", value)}
                label={"Mobile Number"}
                name="phone_number"
                error={!!errors.phone_number}
                helperText={errors.phone_number}
                required={true}
                inputProps={{ onInput: handleMobileNumberInput }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Email"
                value={userdata.email}
                type="text"
                onChange={(value) => handleChange("email", value)}
                label={"Email"}
                name="email"
                error={!!errors.email}
                helperText={errors.email}
                required={true}
              />
            </Grid>

          </Grid>
        </div>
      </Box>
    </>
  );
};

export default AddUser