import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import ReusableTable from "../../components/common/Table";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getImprests } from "../../services/imprest.svc";
import { Imprest } from "../../models/imprest.model";
import CustomButton from "../../components/common/Button";
import isAdmin from "../../services/auth.svc";
import { deleteImprest } from "../../services/imprest.svc";
import { ToastContainer, toast } from "react-toastify";


const headCells = [
    { id: "name", label: "Imprest Name", IsNestedProprty: false },
    { id: "description", label: "Description", IsNestedProprty: false },
    { id: "active", label: "Status", IsNestedProprty: false },
    { id: "actions", label: "Actions", IsNestedProprty: false },
];

const ImprestList: React.FC = () => {
    const [imprest, setImprest] = useState<Imprest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setImprest(imprest);
    }, [imprest]);

    useEffect(() => {
        fetchImprests();
    }, []);

    const fetchImprests = async () => {
        try {
            const Imprests = await getImprests();
            setImprest(Imprests as any);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Imprests:", error);
        }
    };

    //Handle Edit Methode
    const handleEdit = (id: number) => {
        navigate(`/editimprest/${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteImprest(id);
            toast.success("Delete Successfull")
            fetchImprests();
        } catch (err) {
            toast.error("Product assigned to imprest can't delete")
        }
    };
    return (
        <div className="subpage_content">
            <ToastContainer />
            <div className="top_title_buttons_area" style={{ display: 'flex' }}>
                <h2 className="page_main_title">List Of Imprests</h2>
                <div>
                    <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
                        {isAdmin() && (
                            <CustomButton
                                type="submit"
                                startIcon={<AddCircleIcon />}
                                onClick={() => navigate("/addimprest")}
                            >
                                <span>ADD Imprest</span>
                            </CustomButton>
                        )}

                    </div>
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
                        columns={headCells.filter((cell) => {
                            return isAdmin() || cell.id !== "actions";
                        })}
                        data={imprest}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </Paper>
        </div>
    );
};

export default ImprestList;