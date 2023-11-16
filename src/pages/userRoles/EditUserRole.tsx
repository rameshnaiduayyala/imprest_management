import { useState, useEffect } from "react";
import { getusers } from "../../services/user.svc";
import { getRoles } from "../../services/role.svc";
import { putUserRoleData, getOneUserRoleData } from "../../services/roleUser.svc";
import { useNavigate, useParams } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Grid } from "@mui/material";
import Dropdown, { DropdownOption } from "../../components/common/Dropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomButton from "../../components/common/Button";
import "./userRoles.css";
import { Role } from "../../models/role.model";
import { User } from "../../models/user.model";
import { Imprest } from "../../models/imprest.model";
import { getImprests } from "../../services/imprest.svc";
import { ToastContainer, toast } from "react-toastify";

const EditUserRole = () => {
  const [users, setUsers] = useState<DropdownOption[]>([]);
  const [roles, setRoles] = useState<DropdownOption[]>([]);
  const [imprests, setImprests] = useState<DropdownOption[]>([]);
  const [userRoleData, setUserRoleData] = useState({
    user: "",
    role: "",
    imprest: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchImprests();
    if (id) {
      fetchUserRoleForEdit(id);
    }
  }, [id]);

  // Fetch Roles Data
  const fetchRoles = async () => {
    try {
      type Nullable<T> = T | null;
      const roles: Nullable<Role[]> = await getRoles();
      if (roles != null && roles.length > 0) {
        const roleDropdownList: DropdownOption[] = roles.map((role: Role) => ({
          name: role.name,
          value: role.id?.toString() || '',
        }));
        setRoles(roleDropdownList);
      }
    } catch (error) {
      console.error("Fetch Roles failed:", error);
    }
  };

  // Fetch User Data
  const fetchUsers = async () => {
    try {
      const users = await getusers();
      const userDropdownList: DropdownOption[] = users.map((user: User) => ({
        name: user.user_name,
        value: user.id?.toString(),
      }));
      setUsers(userDropdownList);

    } catch (error) {
      console.error("Fetch Users failed:", error);
    }
  };

  const fetchImprests = async () => {
    try {
      const imprests = await getImprests();
      if (imprests != null && imprests.length > 0) {
        const imprestDropdownList: DropdownOption[] = imprests.map((imprest: Imprest) => ({
          name: imprest.name,
          value: imprest.id?.toString() || '',
        }));
        setImprests(imprestDropdownList);
      }
    } catch (error) {
      console.error("Fetch Imprests failed:", error);
    }
  };

  // Fetch Role Data for Editing
  const fetchUserRoleForEdit = async (id: any) => {
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


      if (id) {
        const userRoleId = parseInt(id)
        const response = await putUserRoleData(userRoleId, userRoleData);
        if (response) {
          toast.success("Update User Role update successful")
          setTimeout(() => {
            navigate("/userrole");
          }, 1500);
        } else {
          console.error("Role update failed");
        }
      }
    } catch (error) {
      console.error("Role assignment/updates failed:", error);
    }
  };

  const handleChange = (field: any, value: any) => {
    setUserRoleData((prevUserRoles) => ({
      ...prevUserRoles,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/userrole");
  };
  console.log(imprests)
  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area" style={{ display: 'flex' }}>
        <h2>EDIT USER ROLE</h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              className=""
              startIcon={<ManageAccountsIcon />}
              type="submit"
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
      <Box
        className="common_container"
        component="form"
        onSubmit={handleSubmit}
      >
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Users:"
                options={users}
                value={userRoleData.user}
                onChange={(value) => handleChange("user", value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Role:"
                options={roles}
                value={userRoleData.role}
                onChange={(value) => handleChange("role", value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Imprest:"
                options={imprests}
                value={userRoleData.imprest}
                onChange={(value) => handleChange("imprest", value)}
              />
            </Grid>

          </Grid>


        </div>
      </Box>
    </>
  );
};

export default EditUserRole;
