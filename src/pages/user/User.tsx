import React, { useState, useEffect } from "react";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReusableTable from "../../components/common/Table";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getData, deleteUserData } from "../../services/user.svc";
import { User as user } from "../../models/user.model";
import "./users.css";

// interface Data {
//   id: number;
//   user_name: string;
//   first_name: string;
//   middle_name: string;
// }

const headCells = [
  { id: "id", label: "User ID" },
  { id: "user_name", label: "User Name" },
  { id: "first_name", label: "First Name" },
  { id: "middle_name", label: "Middle Name" },
  { id: "last_name", label: "Last Name" },
  { id: "phone_number", label: "Mobile Number" },
  { id: "email", label: "Email" },
  { id: "created_by", label: "Created By" },
  { id: "modified_by", label: "Modified By" },
  { id: "hospital_id", label: "Hospital Id" },
  { id: "active", label: "Active" },
  { id: "createdAt", label: "Created At" },
  { id: "updatedAt", label: "Updated At" },
  { id: "actions", label: "Actions" },
];

const User: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [dataCopy, setDataCopy] = useState<user[]>([]);
  const [data, setData] = useState<user[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (e: string | number | any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterdata = dataCopy.filter((item) =>
      item.user_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setData(filterdata);
  }, [dataCopy, search]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getData();
      const jsonData = await response.data;
      setData(jsonData);
      setDataCopy(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edituser/${id}`);
  };

  const deleteUser = async (id: number) => {
    await deleteUserData(id);
    alert("User ID " + id + " Successfully Deleted");
    fetchData();
  };

  return (
    <div className="subpage_content">
      <div className="static_title">
        <h2 className="page_main_title">List Of Users</h2>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          className="search_field"
          placeholder="Search"
          type="text"
          size="small"
          onChange={handleSearch}
          style={{ marginTop: "15px", padding: "3px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="btn_general"
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/adduser")}
        >
          ADD User
        </Button>
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
            data={data}
            onEdit={handleEdit}
            onDelete={deleteUser}
          />
        )}
      </Paper>
    </div>
  );
};

export default User;
