import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import { KeyValue } from "../../models/keyvalue.model";
import { useNavigate, useParams } from "react-router-dom";
import { getImprests, getProducts } from "../../services/common.svc";
import { getImprestProductById, updateImprestProduct } from "../../services/imprestProduct.svc";
import { ImprestProduct } from "../../models/imprestProduct.model";
import { ToastContainer, toast } from "react-toastify";

const EditImprestProduct = () => {
  const activeStatus = [
    { name: "Active", value: "true" },
    { name: "Inactive", value: "false" },
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState<KeyValue[]>([]);
  const [imprests, setImprests] = useState<KeyValue[]>([]);
  const [imprestProducts, setImprestProducts] = useState<ImprestProduct>({
    product_id: "",
    imprest_id: "",
    hospital_id: "",
    min_stock: "",
    max_stock: "",
    available_stock: "",
    active: false
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
    fetchImprestProductById(id as string);
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

  const fetchImprestProductById = async (id: number | string) => {
    try {
      const existingImprestProduct = await getImprestProductById(id);
      console.log(existingImprestProduct, "existingImprestProduct")
      setImprestProducts(existingImprestProduct);
    } catch (error) {
      console.error("Fetch Imprest Product failed:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setImprestProducts((prevImprestProducts) => ({
      ...prevImprestProducts,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };


  const handleCancel = () => {
    navigate("/imprestproductlist");
  };

  const handleUpdate = async () => {
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
        await updateImprestProduct(id as string, imprestProducts);
        toast.success("Update Success");
        setTimeout(() => {
          navigate("/imprestproductlist");
        }, 1500);
      } catch (error) {
        console.error("Failed to update product", error);
      }
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area">
        <h2 className="page_main_title">
          Add Imprest Product
        </h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              className=""
              startIcon={<InventoryIcon />}
              type="submit"
              onClick={handleUpdate}
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
        onSubmit={handleUpdate}
      >
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Product Name"
                options={products}
                value={imprestProducts.product_id as string}
                onChange={(value) => handleChange("product_id", value)}
                error={!!errors.product_id}
                helperText={errors.product_id}
                isRequired

              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Imprest Name"
                options={imprests}
                value={imprestProducts.imprest_id as string}
                onChange={(value) => handleChange("imprest_id", value)}
                error={!!errors.imprest_id}
                helperText={errors.imprest_id}
                isRequired
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Minimum Stock"
                value={imprestProducts.min_stock as string}
                onChange={(value) => handleChange("min_stock", value)}
                type="number"
                label={"Minimum Stock"}
                name="Minimum_stock"
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
                value={imprestProducts.max_stock as string}
                onChange={(value) => handleChange("max_stock", value)}
                type="number"
                label={"Maximum Stock"}
                name="Maximum_stock"
                error={!!errors.max_stock}
                helperText={errors.max_stock}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Available Stock"
                value={imprestProducts.available_stock as string}
                onChange={(value) => handleChange("available_stock", value)}
                type="number"
                label={"Available Stock"}
                name="Available_stock"
                error={!!errors.available_stock}
                helperText={errors.available_stock}
                required

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Status"
                options={activeStatus}
                value={imprestProducts.active as any}
                onChange={(value) => handleChange("active", value)}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default EditImprestProduct;
