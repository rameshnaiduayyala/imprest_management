import { Product } from "../../models/product.model";
import { useState, useEffect } from "react";
import { deleteProduct, getProduct } from "../../services/product.svc";
import CustomButton from "../../components/common/Button";
import ReusableTable from "../../components/common/Table";
import { Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import InventoryIcon from "@mui/icons-material/Inventory";
import { ToastContainer, toast } from "react-toastify";

const headCells = [
  { id: "generic_name.name", label: "Generic Name", IsNestedProprty: true },
  { id: "description", label: "Description", IsNestedProprty: false },
  { id: "strength", label: "Strength", IsNestedProprty: false },
  { id: "short_code", label: "Short code", IsNestedProprty: false },
  { id: "pack_size", label: "Pack size", IsNestedProprty: false },
  { id: "pack_unit_of_measure.name", label: "pack uom", IsNestedProprty: true },
  { id: "unit_of_measure.name", label: "UOM", IsNestedProprty: true },
  { id: "product_form.name", label: "Product Form", IsNestedProprty: true },
  { id: "brand.name", label: "Brand", IsNestedProprty: true },
  { id: "actions", label: "Actions", IsNestedProprty: false },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const Products = await getProduct();
      if (Products != null && Products.length > 0) {
        setProducts(Products);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Handle Edit Methode
  const handleEdit = (id: number) => {
    navigate(`/editproduct/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success("Delete Successfull")
      fetchProduct();
    } catch (err) {
      toast.error("Product assigned to imprest can't delete")
    }
  };

  return (
    <div className="subpage_content">
      <ToastContainer />
      <div className="top_title_buttons_area">
        <h2 className="page_main_title">Product List</h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              className=""
              startIcon={<InventoryIcon />}
              onClick={() => navigate("/addproduct")}
            >
              <span>ADD Product</span>
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
          <ReusableTable columns={headCells} data={products} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </Paper>
    </div>
  );
}

export default ProductList;