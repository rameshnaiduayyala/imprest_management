import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { postUserData } from "../../services/user.svc";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Roleslist } from "../../services/role.svc";
import "./addUser.css";
import { User } from "../../models/user.model";
const AddUser = () => {

  const userStatus = [
    { name: "Active", value: "true" },
    { name: "Inactive", value: "false" },
  ];
  const [userRoles, setUserRoles] = useState([]);
  const [userdata, setUserData] = useState<User>({
    user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    created_by: "",
    modified_by: "",
    hospital_id: "",
    active: "",
  });
  useEffect(() => {
    fetchRolesData();
  }, []);
  const fetchRolesData = async () => {
    try {
      const response = await Roleslist();
      if (response.status === 200) {
        // Assuming the response.data is an array of role objects with 'name' property
        const rolesData = response.data.map((role: { name: string; }) => ({
          name: role.name,
          value: role.name,
        }));
        setUserRoles(rolesData);
      }
    } catch (error) {
      console.error("Fetch roles failed:", error);
    }
  };
  const navigate = useNavigate();
  const handleChange = (name: string, value: string | number) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postUserData(userdata);
    setUserData({
      user_name: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      created_by: "",
      modified_by: "",
      hospital_id: "",
      active: "",
    });
    alert("User Added Successfully");
    navigate("/users", {
      state: { successMessage: "User created successfully" },
    });
  };
  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <>
      <div className="adduser">
        <h2>
          <PersonAddIcon />
          Add User
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
            <Grid item xs={6} sm={3} className="grid_item_space">
              <Dropdown
                name="User Status"
                options={userStatus}
                value={userdata.active}
                onChange={(value) => handleChange("active", value)}
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

export default AddUser;