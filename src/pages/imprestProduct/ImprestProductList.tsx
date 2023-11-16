import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import ReusableTable from "../../components/common/Table";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./imprestProduct.css";
import CustomButton from "../../components/common/Button";
import { ImprestProduct } from "../../models/imprestProduct.model";
import { deleteImprestProduct, getImprestProduct } from "../../services/imprestProduct.svc";
import { ToastContainer, toast } from "react-toastify";

const headCells = [
    { id: "Product.description", label: "Product Name", IsNestedProprty: true },
    { id: "imprest.name", label: "Imprest Name", IsNestedProprty: true },
    { id: "min_stock", label: "Min Stock", IsNestedProprty: false },
    { id: "max_stock", label: "Max Stock", IsNestedProprty: false },
    { id: "available_stock", label: "Availablestock", IsNestedProprty: false },
    { id: "actions", label: "Actions", IsNestedProprty: false },
];

const ImprestProductList: React.FC = () => {
    const [imprestProduct, setImprestProduct] = useState<ImprestProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchImprestProduct();
    }, []);

    const fetchImprestProduct = async () => {
        try {
            const ImprestProducts = await getImprestProduct();
            if (ImprestProducts) {
                setImprestProduct(ImprestProducts);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/editimprestproduct/${id}`);
    };

    const deleteimprestProduct = async (id: number) => {
        await deleteImprestProduct(id);
        toast.error("Delete Successfull")
        fetchImprestProduct();
    };

    return (
        <div className="subpage_content">
            <ToastContainer />
            <div className="static_title">
                <h2 className="page_main_title">Imprest Products List</h2>
                <div>
                    <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
                        <CustomButton
                            className=""
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate("/addimprestproduct")}

                        >
                            <span>ADD Imprest Product</span>
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
                        data={imprestProduct}
                        onEdit={handleEdit}
                        onDelete={deleteimprestProduct}
                    />
                )}
            </Paper>
        </div>
    );
};

export default ImprestProductList;
