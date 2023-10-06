import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { putUserData, getOneUserData } from "../../services/user.svc";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Checkbox from "@mui/material/Checkbox";
import { User } from "../../models/user.model"

const EditUser = () => {
  const { id } = useParams();
  const userId = id ? parseInt(id) : -1;

  const userRoles = [
    { name: "Super Admin", value: "super_admin" },
    { name: "Admin", value: "admin" },
    { name: "User", value: "user" },
  ];
  const intialData: User = {
    user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    created_by: "",
    modified_by: "",
    hospital_id: 0,
    active: false,
  };
  const [userdata, setUserData] = useState(intialData);

  const navigate = useNavigate();
  const handleChange = (name: string, value: string | number | boolean) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await putUserData(userId, userdata);
      if (response.status === 200) {
        setUserData(response.data);
        alert("User " + id + " Updated Successfully");
        navigate("/users");
      }
      setUserData(intialData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    navigate("/users");
  };
  // get one user
  useEffect(() => {
    if (userId !== -1) {
      loadOneUser(userId);
    }
  }, [userId]);
  const loadOneUser = async (userId: number) => {
    try {
      const response = await getOneUserData(userId);
      console.log(response.data, "useronedata");

      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="adduser">
        <h2>
          <PersonAddIcon />
          Edit User
        </h2>
      </div>
      <Box
        className="add_user_container"
        component="form"
        onSubmit={handleSubmit}
      >
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                value={userdata.user_name}
                onChange={(value) => handleChange("user_name", value)}
                name="user_name"
                label={"User Name"}
                type="text"
              />
            </Grid>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                value={userdata.first_name}
                onChange={(value) => handleChange("first_name", value)}
                type="text"
                placeholder="First Name"
                label={"First Name"}
                name="first_name"
              />
            </Grid>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Middle Name"
                value={userdata.middle_name}
                onChange={(value) => handleChange("middle_name", value)}
                type="text"
                label={"Middle Name"}
                name="Middle Name"
              />
            </Grid>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Last Name"
                value={userdata.last_name}
                onChange={(value) => handleChange("last_name", value)}
                type="text"
                label={"Last Name"}
                name="last_name"
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Mobile Number"
                value={userdata.phone_number}
                type="text"
                onChange={(value) => handleChange("phone_number", value)}
                label={"Mobile Number"}
                name="phone_number"
              />
            </Grid>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Email"
                value={userdata.email}
                type="text"
                onChange={(value) => handleChange("email", value)}
                label={"Email"}
                name="email"
              />
            </Grid>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <Grid item xs={6} sm={3} className="grid_item_space">
                <Dropdown
                  name="Created By"
                  options={userRoles}
                  value={userdata.created_by}
                  onChange={(value) => handleChange("created_by", value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                placeholder="modified_by"
                value={userdata.modified_by}
                type="text"
                onChange={(value) => handleChange("modified_by", value)}
                label="Modified by"
                name="modified_by"
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <ReusableTextField
                type="text"
                name="hospital_id"
                label={"Hospital"}
                value={userdata.hospital_id}
                onChange={(value) => handleChange("hospital_id", value)}
              />
            </Grid>
            <Grid item xs={6} sm={3} className="checkbox">
              <div>
                <Typography>User Status</Typography>
              </div>
              <Checkbox
                name="active"
                checked={userdata.active ? true : false}
                onChange={(e) => handleChange("active", e.target.checked)}
              />
            </Grid>
          </Grid>
          <div className="buttons">
            <CustomButton
              className="submitbtn"
              startIcon={<PersonAddIcon />}
              type="submit"
            >
              Submit
            </CustomButton>
            <CustomButton
              className="buttoncancel"
              startIcon={<CancelIcon className="button_icon" />}
              onClick={handleCancel}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </Box>
    </>
  );
};

export default EditUser;
