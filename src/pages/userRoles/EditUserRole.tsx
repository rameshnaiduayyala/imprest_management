/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getData } from "../../services/user.svc";
import { Roleslist } from "../../services/role.svc";
import { getImprest } from "../../services/imprest.svc";
import {createUserRole,putUserRoleData,getOneUserRoleData} from "../../services/roleUser.svc";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Dropdown from "../../components/common/Dropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomButton from "../../components/common/Button";
import "./userRoles.css";

const EditUserRole = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [imprest, setImprest] = useState([]);
  const [userRoleData, setUserRoleData] = useState({
    user: "",
    role: "",
    imprest: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
    fetchRolesData();
    fetchUserRoleData();
    if (id) {
      fetchUserRoleForEdit(id);
    }
  }, [id]);

  // Fetch Roles Data
  const fetchRolesData = async () => {
    try {
      const response = await Roleslist();
      if (response.status === 200) {
        const rolesData = response.data.map((role:any) => ({
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
        const UsersData = response.data.map((user:any) => ({
          name: user.user_name,
          value: user.id.toString(),
        }));
        setUsers(UsersData);
      }
    } catch (error) {
      console.error("Fetch Users failed:", error);
    }
  };

  // Fetch Imprest Data
  const fetchUserRoleData = async () => {
    try {
      const response = await getImprest();
      if (response.status === 200) {
        const UsersData = response.data.map((userRoles:any) => ({
          name: userRoles.name,
          value: userRoles.id.toString(),
        }));
        setImprest(UsersData);
      }
    } catch (error) {
      console.error("Fetch Users failed:", error);
    }
  };

  // Fetch Role Data for Editing
  const fetchUserRoleForEdit = async (id:any) => {
    try {
      const response = await getOneUserRoleData(id);
      if (response.status === 200) {
        const roleData = response.data;
        setUserRoleData({
          user: roleData.user_id.toString(),
          role: roleData.role_id.toString(),
          imprest: roleData.imprest_id.toString(),
        });
      }
    } catch (error) {
      console.error("Fetch User Role for Edit failed:", error);
    }
  };

  // Update Function
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
      const userData = {
        user_id: userRoleId,
        role_id: roleId,
        imprest_id: imprestId,
      };
      if (id) {
        const response = await putUserRoleData(id, userData);
        if (response) {
          alert("Role update successful");
          navigate("/userrole");
        } else {
          console.error("Role update failed");
        }
      } else {
        const response = await createUserRole(userData);
        if (response) {
          console.log("Role assignment successful");
          navigate("/userrole");
        } else {
          console.error("Role assignment failed");
        }
      }
    } catch (error) {
      console.error("Role assignment/updates failed:", error);
    }
  };

  const handleChange = (field:any, value:any) => {
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
        <h2>{id ? "Edit User Role:" : "Assign User To Role:"}</h2>
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
              {id ? "Update" : "Submit"}
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

export default EditUserRole;
