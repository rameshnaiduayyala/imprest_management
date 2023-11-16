import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import { KeyValue } from "../../models/keyvalue.model";
import { useNavigate } from "react-router-dom";
import { getImprests, getProducts } from "../../services/common.svc";
import { createImprestProduct } from "../../services/imprestProduct.svc";

const AddImprestProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<KeyValue[]>([]);
  const [imprests, setImprests] = useState<KeyValue[]>([]);
  const [imprestProducts, setImprestProducts] = useState({
    product_id: "",
    imprest_id: "",
    hospital_id: "",
    min_stock: "",
    max_stock: "",
    available_stock: "",

  });

  const [errors, setErrors] = useState({
    product_id: "",
    imprest_id: "",
    min_stock: "",
    max_stock: "",
    available_stock: "",
  });

  useEffect(() => {
    fetchImprests();
    fetchProducts();
  }, []);

  const fetchImprests = async () => {
    try {
      const keyValues = await getImprests();
      setImprests(keyValues);
    } catch (error) {
      console.error("Fetch Imprests failed:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const keyValues = await getProducts();
      setProducts(keyValues);
    } catch (error) {
      console.error("Fetch Products failed:", error);
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setImprestProducts({ ...imprestProducts, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCancel = () => {
    navigate("/imprestproductlist");
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!imprestProducts.product_id) {
      newErrors.product_id = "Product Name is required";
      isValid = false;
    }
    if (!imprestProducts.imprest_id) {
      newErrors.imprest_id = "Imprest Name is required";
      isValid = false;
    }
    if (!imprestProducts.min_stock) {
      newErrors.min_stock = "Minimum Stock is required";
      isValid = false;
    }
    if (!imprestProducts.max_stock) {
      newErrors.max_stock = "Maximum Stock is required";
      isValid = false;
    }
    if (!imprestProducts.available_stock) {
      newErrors.available_stock = "Available Stock is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const createdImprestProduct = await createImprestProduct(imprestProducts);
        if (createdImprestProduct) {
          toast.success("Imprest Product created successfully");
          setTimeout(() => {
            navigate("/imprestproductlist");
          }, 1500);
          setImprestProducts(
            {
              product_id: "",
              imprest_id: "",
              hospital_id: "",
              min_stock: "",
              max_stock: "",
              available_stock: ""
            }
          )
        }
      } catch (error) {
        console.error("Failed to create Imprest Product", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area">
        <h2 className="page_main_title">Add Imprest Product</h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: "50px" }}>
            <CustomButton
              className=""
              startIcon={<InventoryIcon />}
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
                name="Product Name"
                options={products}
                value={imprestProducts.product_id}
                onChange={(value) => handleChange("product_id", value as any)}
                error={!!errors.product_id}
                helperText={errors.product_id}
                isRequired
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Imprest Name"
                options={imprests}
                value={imprestProducts.imprest_id}
                onChange={(value) => handleChange("imprest_id", value as any)}
                error={!!errors.imprest_id}
                helperText={errors.imprest_id}
                isRequired
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Minimum Stock"
                value={imprestProducts.min_stock}
                onChange={(value) => handleChange("min_stock", value as any)}
                type="number"
                label="Minimum Stock"
                name="min_stock"
                error={!!errors.min_stock}
                helperText={errors.min_stock}
                required
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Maximum Stock"
                value={imprestProducts.max_stock}
                onChange={(value) => handleChange("max_stock", value)}
                type="number"
                label="Maximum Stock"
                name="max_stock"
                error={!!errors.max_stock}
                helperText={errors.max_stock}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Available Stock"
                value={imprestProducts.available_stock}
                onChange={(value) => handleChange("available_stock", value)}
                type="number"
                label="Available Stock"
                name="available_stock"
                error={!!errors.available_stock}
                helperText={errors.available_stock}
                required
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default AddImprestProduct;
