import { Grid, Box, Typography, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUserById } from "../../services/user.svc";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { User } from "../../models/user.model"
import { ToastContainer, toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const userId = id ? parseInt(id) : -1;

  const initialData: User = {
    user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    active: false,
  };

  const [user, setUser] = useState<User>(initialData);
  const [errors, setErrors] = useState<User>(initialData);
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();

  const activeTitle = user.active ? "Active" : "Inactive";
  const isEmailValid = (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const handleChange = (name: string, value: string | number | boolean) => {
    const newErrors = { ...initialData } as any;

    if (name === "email") {
      setEmailValid(isEmailValid(value as string));
      if (!isEmailValid(value as string)) {
        newErrors.email = "Enter a valid email";
      } else {
        newErrors.email = "";
      }
    } else if (name === "phone_number") {
      if (!/^\d{0,10}$/.test(value as string)) {
        newErrors.phone_number = "Mobile number should be up to 10 digits";
      } else {
        newErrors.phone_number = "";
      }
    } else if (name !== "middle_name") {
      if (value === "") {
        const fieldName = name.replace(/_/g, ' ');
        newErrors[name as keyof User] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`; // Capitalize the first letter
      } else {
        newErrors[name as keyof User] = "";
      }
    }

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name as keyof User],
    }));
  };

  const handleMobileNumberInput = (e: any) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    e.target.value = sanitizedInput;
    handleChange("phone_number", sanitizedInput);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let isValid = true;

    const newErrors = { ...initialData } as any;

    for (const key in user) {
      if (key !== "middle_name" && user[key as keyof User] === "") {
        const fieldName = key.replace(/_/g, ' ');
        newErrors[key as keyof User] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`; // Capitalize the first letter
        isValid = false;
      }
    }

    if (!/^\d{0,10}$/.test(user.phone_number)) {
      newErrors.phone_number = "Mobile number should be up to 10 digits";
      isValid = false;
    }

    if (!emailValid) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid && isEmailValid(user.email)) {
      try {
        const updatedUser = await updateUser(userId, user);

        if (updatedUser) {
          toast.success("User " + user.user_name + " Updated Successfully");
          setUser(updatedUser as any);
          setTimeout(() => {
            navigate("/users");
          }, 1000);
          setUser(initialData);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };


  const handleCancel = () => {
    navigate("/users");
  };

  useEffect(() => {
    if (userId !== -1) {
      loadOneUser(userId);
    }
  }, [userId]);
  const loadOneUser = async (userId: number) => {
    try {
      const oneUser = await getUserById(userId);
      setUser(oneUser as any);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area" style={{ display: 'flex' }}>
        <h2 className="page_main_title">
          Edit User
        </h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              className=""
              startIcon={<PersonAddIcon />}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </CustomButton>
            <CustomButton
              startIcon={<CancelIcon className="button_icon" />}
              onClick={handleCancel}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
      <Box
        className="common_container"
        component="form"
        onSubmit={handleSubmit}
      >
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={user.user_name}
                onChange={(value) => handleChange("user_name", value)}
                name="user_name"
                label={"User Name"}
                type="text"
                error={!!errors.user_name}
                helperText={errors.user_name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={user.first_name}
                onChange={(value) => handleChange("first_name", value)}
                type="text"
                placeholder="First Name"
                label={"First Name"}
                name="first_name"
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Middle Name"
                value={user.middle_name as string}
                onChange={(value) => handleChange("middle_name", value)}
                type="text"
                label={"Middle Name"}
                name="Middle Name"

              />
            </Grid>

          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Mobile Number"
                value={user.phone_number}
                type="text"
                onChange={(value) => handleChange("phone_number", value)}
                label={"Mobile Number"}
                name="phone_number"
                error={!!errors.phone_number}
                helperText={errors.phone_number}
                inputProps={{ onInput: handleMobileNumberInput }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Email"
                value={user.email}
                type="text"
                onChange={(value) => handleChange("email", value)}
                label={"Email"}
                name="email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Last Name"
                value={user.last_name}
                onChange={(value) => handleChange("last_name", value)}
                type="text"
                label={"Last Name"}
                name="last_name"
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="checkbox">
              <div>
                <Typography>{activeTitle}</Typography>
              </div>
              <Checkbox
                name="active"
                checked={user.active ? true : false}
                onChange={(e) => handleChange("active", e.target.checked)}
              />

            </Grid>
          </Grid>

        </div>
      </Box>
    </>
  );
};

export default EditUser;