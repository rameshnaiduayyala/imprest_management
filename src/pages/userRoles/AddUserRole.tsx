/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getData } from "../../services/user.svc";
import { Roleslist } from "../../services/role.svc";
import { getImprest } from "../../services/imprest.svc";
import { createUserRole } from "../../services/roleUser.svc";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Dropdown from "../../components/common/Dropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomButton from "../../components/common/Button";
import { UserRoleData } from "../../models/userRole.model";
import "./userRoles.css";

const RoleAssignment = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [imprest, setImprest] = useState([]);
  const [userRoleData, setUserRoleData] = useState({
    user: "",
    role: "",
    imprest: "",
  });
  console.log(userRoleData);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData();
    fetchRolesData();
    fetchUserRoleData();
  }, []);

  // Fetch Roles Data
  const fetchRolesData = async () => {
    try {
      const response = await Roleslist();
      if (response.status === 200) {
        const rolesData = response.data.map((role: any) => ({
          name: role.name,
          value: role.id.toString(),
        }));
        setRoles(rolesData);
      }
    } catch (error) {
      console.error("Fetch roles failed:", error);
    }
  };

  // Fetch User Data
  const fetchUserData = async () => {
    try {
      const response = await getData();
      if (response.status === 200) {
        const UsersData = response.data.map((user: any) => ({
          name: user.user_name,
          value: user.id.toString(),
        }));
        setUsers(UsersData);
      }
    } catch (error) {
      console.error("Fetch Users failed:", error);
    }
  };

  //Fetch Imprest Data
  const fetchUserRoleData = async () => {
    try {
      const response = await getImprest();
      if (response.status === 200) {
        const UsersData = response.data.map((userRoles: any) => ({
          name: userRoles.name,
          value: userRoles.id.toString(),
        }));
        setImprest(UsersData);
      }
    } catch (error) {
      console.error("Fetch Users failed:", error);
    }
  };
  
  // Submit Function
  const handleSubmit = async () => {
    try {
      if (!userRoleData.user || !userRoleData.role || !userRoleData.imprest) {
        alert("Please select all required fields.");
        return;
      }
      const userRoleId = parseInt(userRoleData.user);
      const roleId = parseInt(userRoleData.role);
      const imprestId = parseInt(userRoleData.imprest);
      if (isNaN(userRoleId) || isNaN(roleId) || isNaN(imprestId)) {
        alert("Invalid values for user, role, or imprest.");
        return;
      }
      const userData: UserRoleData = {
        user_id: userRoleId,
        role_id: roleId,
        imprest_id: imprestId,
      };
      const response = await createUserRole(userData);
      if (response) {
        console.log("Role assignment successful");
        navigate("/userrole");
      } else {
        console.error("Role assignment failed");
      }
    } catch (error) {
      console.error("Role assignment failed:", error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserRoleData((prevUserRoles) => ({
      ...prevUserRoles,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/userrole");
  };

  return (
    <>
      <div className="adduser">
        <h2>Assign User To Role:</h2>
      </div>
      <Box
        className="add_user_container"
        component="form"
        onSubmit={handleSubmit}
      >
        <div>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <Dropdown
                name="Users:"
                options={users}
                value={userRoleData.user}
                onChange={(value) => handleChange("user", value)}
              />
            </Grid>
          </Grid>

          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <Dropdown
                name="Role:"
                options={roles}
                value={userRoleData.role}
                onChange={(value) => handleChange("role", value)}
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={6} sm={3} className="grid_item_space">
              <Dropdown
                name="Imprest:"
                options={imprest}
                value={userRoleData.imprest}
                onChange={(value) => handleChange("imprest", value)}
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

export default RoleAssignment;
