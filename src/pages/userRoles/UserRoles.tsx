import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import ReusableTable from "../../components/common/Table";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserRoleData } from "../../services/roleUser.svc";
import "./userRoles.css";
import CustomButton from "../../components/common/Button";
import { User } from "../../models/user.model";

const headCells = [
  { id: "role.name", label: "Role", IsNestedProprty: true },
  { id: "user.user_name", label: "User", IsNestedProprty: true },
  { id: "imprest.name", label: "Imprest", IsNestedProprty: true },
  { id: "actions", label: "Actions", IsNestedProprty: false },
];

const UserRoles: React.FC = () => {
  const [userRoles, setUserRoles] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUserRoles(userRoles);
  }, [userRoles]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUserRoleData();
      const jsonData = await response.data;
      setUserRoles(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/editroleuser/${id}`);
  };

  return (
    <div className="subpage_content">
      <div className="top_title_buttons_area" style={{ display: 'flex' }}>
        <h2 className="page_main_title">Assigned Roles</h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              className=""
              startIcon={<ManageAccountsIcon />}
              onClick={() => navigate("/addroleuser")}

            >
              <span>Assign Role</span>
            </CustomButton></div>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
      </Box>
      <Paper
        style={{ width: "100%", marginTop: "0px" }}
        className="data_table_global"
      >
        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <ReusableTable
            columns={headCells}
            data={userRoles}
            onEdit={handleEdit}
          />
        )}
      </Paper>
    </div>
  );
};

export default UserRoles;
