import { useState, useEffect } from "react";
import { getusers } from "../../services/user.svc";
import { getRoles } from "../../services/role.svc";
import { getImprests } from "../../services/imprest.svc";
import { createUserRole } from "../../services/roleUser.svc";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Box, Grid } from "@mui/material";
import Dropdown, { DropdownOption } from "../../components/common/Dropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomButton from "../../components/common/Button";
import { UserRole } from "../../models/userRole.model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./userRoles.css";
import { Role } from "../../models/role.model";
import { User } from "./../../models/user.model";
import { Imprest } from "../../models/imprest.model";

const RoleAssignment = () => {
  const [users, setUsers] = useState<DropdownOption[]>([]);
  const [roles, setRoles] = useState<DropdownOption[]>([]);
  const [imprests, setImprests] = useState<DropdownOption[]>([]);
  const [userRoleData, setUserRoleData] = useState({
    user: "",
    role: "",
    imprest: "",
  });

  // Error messages for each dropdown
  const [errors, setErrors] = useState({
    user: "",
    role: "",
    imprest: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchImprests();
  }, []);

  const fetchRoles = async () => {
    try {
      const roles: Role[] = await getRoles();
      const roleDropdownList: DropdownOption[] = roles.map((role: Role) => ({
        name: role.name,
        value: role.id?.toString() || "",
      }));
      setRoles(roleDropdownList);
    } catch (error) {
      console.error("Fetch Roles failed:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const users: User[] = await getusers();
      const userDropdownList: DropdownOption[] = users.map((user: User) => ({
        name: user.user_name,
        value: user.id?.toString() || "",
      }));
      setUsers(userDropdownList as any);
    } catch (error) {
      console.error("Fetch Users failed:", error);
    }
  };

  const fetchImprests = async () => {
    try {
      const imprests: Imprest[] = await getImprests();
      const imprestDropdownList: DropdownOption[] = imprests.map(
        (imprest: Imprest) => ({
          name: imprest.name,
          value: imprest.id?.toString() || "",
        })
      );
      setImprests(imprestDropdownList as any);
    } catch (error) {
      console.error("Fetch Imprests failed:", error);
    }
  };

  const handleSubmit = () => {
    const userError = !userRoleData.user;
    const roleError = !userRoleData.role;
    const imprestError = !userRoleData.imprest;

    setErrors({
      user: userError ? "Please select the user." : "",
      role: roleError ? "Please select the role." : "",
      imprest: imprestError ? "Please select the imprest." : "",
    });

    if (!userError && !roleError && !imprestError) {

      const userRoleId = parseInt(userRoleData.user);
      const roleId = parseInt(userRoleData.role);
      const imprestId = parseInt(userRoleData.imprest);
      if (!isNaN(userRoleId) && !isNaN(roleId) && !isNaN(imprestId)) {
        const userData: UserRole = {
          user_id: userRoleId,
          role_id: roleId,
          imprest_id: imprestId,
        };
        createUserRole(userData)
          .then((response) => {
            if (response) {
              toast.success("Assigned role successfully");
              navigate("/userrole");
            } else {
              console.error("Role assignment failed");
            }
          })
          .catch((error) => {
            console.error("Role assignment failed:", error);
          });
      }
    }
  };

  const handleChange = (field: string, value: string | number) => {
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
      <div className="top_title_buttons_area" style={{ display: "flex" }}>
        <h2 className="page_main_title">Assign Role</h2>
        <div>
          <ToastContainer />
          <div className="gen_buttons" style={{ paddingLeft: "50px" }}>
            <CustomButton
              startIcon={<ManageAccountsIcon />}
              onClick={handleSubmit}
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
      <Box className="common_container">
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Users:"
                options={users}
                value={userRoleData.user}
                onChange={(value) => handleChange("user", value)}
                error={!userRoleData.user}
                helperText={errors.user}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Role:"
                options={roles}
                value={userRoleData.role}
                onChange={(value) => handleChange("role", value)}
                error={!userRoleData.role}
                helperText={errors.role}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Imprest:"
                options={imprests}
                value={userRoleData.imprest}
                onChange={(value) => handleChange("imprest", value)}
                error={!userRoleData.imprest}
                helperText={errors.imprest}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default RoleAssignment;
