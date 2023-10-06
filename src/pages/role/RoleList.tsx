import { Roleslist, deleteRole } from "../../services/role.svc";
import { Role } from "../../models/role.model";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import CustomButton from "../../components/common/Button";
import ReusableTable from "../../components/common/Table";
import { CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const headerCells = [
    { id: "id", label: "Role Name" },
    { id: "name", label: "Role Name" },
    { id: "description", label: "Description" },
    { id: "actions", label: "" }
]

const RoleList = () => {

    const navigate = useNavigate();
    const [roleList, setRoleList] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRolesData();
    }, [])

    const fetchRolesData = async () => {
        try {
            const response = await Roleslist();
            if (response.status === 200) {
                console.log('Roles fetched successfully:', response.data);
                setRoleList(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Feth roles failed:', error);
        }
    };
    const handleAdd = () => {
        navigate('/addrole')
    }

    const handleEdit = (id: number) => {
        navigate(`/editrole/${id}`)
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteRole(id);
            if (response.status === 204) {
                setRoleList((prevRoles) => prevRoles.filter((role) => role.id !== id));
                console.log(`Role with ID ${id} deleted successfully.`);
            } else {
                console.error(`Failed to delete role with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error while deleting role with ID ${id}:`, error);
        }
    };

    return (
        <>
            {loading ? (

                <div className="loader">

                    <CircularProgress />

                </div>

            ) : (
                <div className="role_list_container">
                    <div className="header">
                        <div className="title">
                            <Typography variant="h4">Role List</Typography>
                        </div>
                        <div className="button_add">
                            <CustomButton onClick={handleAdd}>Add</CustomButton>
                        </div>
                    </div>
                    <div className="table_container">
                        <div className="table_body">
                            <ReusableTable
                                columns={headerCells}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                data={roleList}

                            />
                        </div>
                    </div>
                </div>


            )}
            <div>

            </div>
        </>
    )
}

export default RoleList;



