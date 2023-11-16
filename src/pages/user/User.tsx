import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import ReusableTable from "../../components/common/Table";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getusers, deleteOneUser } from "../../services/user.svc";
import { User as user } from "../../models/user.model";
import "./users.css";
import CustomButton from "../../components/common/Button";
import { ToastContainer, toast } from "react-toastify";

const headCells = [
  { id: "user_name", label: "User Name" },
  { id: "first_name", label: "First Name" },
  { id: "middle_name", label: "Middle Name" },
  { id: "last_name", label: "Last Name" },
  { id: "phone_number", label: "Mobile Number" },
  { id: "email", label: "Email" },
  { id: "active", label: "Status" },
  { id: "actions", label: "Actions" },
];

const User: React.FC = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const Users = await getusers();
      if (Users) {
        setUsers(Users);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edituser/${id}`);
  };

  const deleteUser = async (id: number) => {
    try {
      await deleteOneUser(id);
      toast.success("User Deleted");
      fetchUser();
    } catch (error) {
      console.error(error);
      toast.error("This user is assigned to Role");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="subpage_content">
        <div className="top_title_buttons_area" style={{ display: 'flex' }}>
          <h2 className="page_main_title">List Of Users</h2>
          <div>
            <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
              <CustomButton
                className=""
                startIcon={<PersonAddIcon />}
                onClick={() => navigate("/adduser")}
              >
                <span>ADD User</span>
              </CustomButton></div>
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}>
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
              data={users}
              onEdit={handleEdit}
              onDelete={deleteUser}
            />
          )}
        </Paper>
      </div>
    </>
  );
};

export default User;