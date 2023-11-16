import { getRoles, deleteRole } from "../../services/role.svc";
import { Role } from "../../models/role.model";
import { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import CustomButton from "../../components/common/Button";
import ReusableTable from "../../components/common/Table";
import { CircularProgress } from "@mui/material";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const headerCells = [
    { id: "name", label: "Role Name" },
    { id: "description", label: "Description" },
    { id: "actions", label: "Actions" }
]

const RoleList = () => {

    const navigate = useNavigate();
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRoles();
    }, [])

    const fetchRoles = async () => {
        try {
            const Roles = await getRoles();
            if (Roles) {
                setRoles(Roles);
                setLoading(false);
            }
        } catch (error) {
            console.error('Feth roles failed:', error);

        }
    };

    const handleEdit = (id: number) => {
        navigate(`/editrole/${id}`)
    };

    const handleDelete = async (id: number) => {

        try {
            await deleteRole(id);
            toast.success("Role Deleted Successfully ");
            fetchRoles();
        } catch (error) {
            console.error(error);
            toast.error("This user is assigned to Role");
        }
    };

    return (
        <div className="subpage_content">
            <ToastContainer />
            <div className="top_title_buttons_area">
                <h2 className="page_main_title">List Of Roles</h2>
                <div>
                    <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
                        <CustomButton
                            className=""
                            startIcon={<CoPresentIcon />}
                            onClick={() => navigate("/addrole")}
                        >
                            <span>ADD Role</span>
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
                        columns={headerCells}
                        data={roles}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </Paper>
        </div>
    )
}

export default RoleList;



