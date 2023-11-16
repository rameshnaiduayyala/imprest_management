import React from "react";
import { Grid, Box } from "@mui/material";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getProductById } from "../../services/product.svc";
import {
  getBrands,
  getGenerics,
  getPackUoms,
  getProductForms,
  getUoms,
} from "../../services/common.svc";
import { KeyValue } from "../../models/keyvalue.model";
import { updateProduct } from "../../services/product.svc";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Product } from "../../models/product.model";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [generic, setGeneric] = React.useState<KeyValue[]>([]);
  const [brand, setBrand] = React.useState<KeyValue[]>([]);
  const [packuom, setPackuom] = React.useState<KeyValue[]>([]);
  const [uom, setUom] = React.useState<KeyValue[]>([]);
  const [productform, setProductform] = React.useState<KeyValue[]>([]);
  const [product, setProduct] = React.useState<Product>({
    description: "",
    strength: "",
    short_code: "",
    pack_size: "",
    pack_uom_id: "",
    measure_id: "",
    product_form_id: "",
    brand_id: "",
    generic_id: "",
  });

  const [errors, setErrors] = React.useState({
    description: "",
    strength: "",
    short_code: "",
    pack_size: "",
    pack_uom_id: "",
    measure_id: "",
    product_form_id: "",
    brand_id: "",
    generic_id: "",
  });

  React.useEffect(() => {
    fetchGenerics();
    fetchBrands();
    fetchPackuom();
    fetchUom();
    fetchProductForm();
    fetchProduct(id as string);
  }, [id]);

  const fetchGenerics = async () => {
    try {
      const keyValues = await getGenerics();
      setGeneric(keyValues);
    } catch (error) {
      console.error("Fetch Generic Data failed:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const keyValues = await getBrands();
      setBrand(keyValues);
    } catch (error) {
      console.error("Fetch Brand Data failed:", error);
    }
  };

  const fetchPackuom = async () => {
    try {
      const keyValues = await getPackUoms();
      setPackuom(keyValues);
    } catch (error) {
      console.error("Fetch Pack UOM Data failed:", error);
    }
  };

  const fetchUom = async () => {
    try {
      const keyValues = await getUoms();
      setUom(keyValues);
    } catch (error) {
      console.error("Fetch UOM Data failed:", error);
    }
  };

  const fetchProductForm = async () => {
    try {
      const keyValues = await getProductForms();
      setProductform(keyValues);
    } catch (error) {
      console.error("Fetch Product Form Data failed:", error);
    }
  };

  const fetchProduct = async (id: number | string) => {
    try {
      const existingProduct = await getProductById(id);
      setProduct(existingProduct);
    } catch (error) {
      console.error("Fetch Product Data failed:", error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProduct((prevProducts) => ({
      ...prevProducts,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleCancel = () => {
    navigate("/productlist");
  };

  const handleUpdate = async () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!product.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!product.strength) {
      newErrors.strength = "Strength is required";
      isValid = false;
    }
    if (!product.pack_size) {
      newErrors.pack_size = "Pack size is required";
      isValid = false;
    }
    if (!product.pack_uom_id) {
      newErrors.pack_uom_id = "Pack UOM is required";
      isValid = false;
    }
    if (!product.measure_id) {
      newErrors.measure_id = "Measure is required";
      isValid = false;
    }
    if (!product.product_form_id) {
      newErrors.product_form_id = "Product Form is required";
      isValid = false;
    }
    if (!product.brand_id) {
      newErrors.brand_id = "Brand is required";
      isValid = false;
    }
    if (!product.generic_id) {
      newErrors.generic_id = "Generic is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        await updateProduct(id as string, product);
        toast.success("Update Success");
        setTimeout(() => {
          navigate("/productlist");
        }, 1500);
      } catch (error) {
        console.error("Failed to update product", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area" style={{ display: "flex" }}>
        <h2 className="page_main_title">Edit Product</h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: "50px" }}>
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
              <ReusableTextField
                value={product.description}
                onChange={(value) => handleChange("description", value as string)}
                name="description"
                label="Description"
                type="text"
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={product.strength}
                onChange={(value) => handleChange("strength", value as string)}
                type="text"
                placeholder="Strength"
                label="Strength"
                name="strength"
                error={!!errors.strength}
                helperText={errors.strength}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Short_code"
                value={product.short_code}
                onChange={(value) => handleChange("short_code", value as string)}
                type="text"
                label="Short Code"
                name="short_code"
              />
            </Grid>

          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Pack UOM"
                options={packuom}
                value={product.pack_uom_id as string}
                onChange={(value) => handleChange("pack_uom_id", value as string)}
                error={!!errors.pack_uom_id}
                helperText={errors.pack_uom_id}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Measure"
                options={uom}
                value={product.measure_id as string}
                onChange={(value) => handleChange("measure_id", value as string)}
                error={!!errors.measure_id}
                helperText={errors.measure_id}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Product Form"
                options={productform}
                value={product.product_form_id as string}
                onChange={(value) => handleChange("product_form_id", value as string)}
                error={!!errors.product_form_id}
                helperText={errors.product_form_id}
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Brand"
                options={brand}
                value={product.brand_id as string}
                onChange={(value) => handleChange("brand_id", value as string)}
                error={!!errors.brand_id}
                helperText={errors.brand_id}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Generic"
                options={generic}
                value={product.generic_id as string}
                onChange={(value) => handleChange("generic_id", value as string)}
                error={!!errors.generic_id}
                helperText={errors.generic_id}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Pack_size"
                value={product.pack_size}
                onChange={(value) => handleChange("pack_size", value as string)}
                type="number"
                label="Pack size"
                name="pack_size"
                error={!!errors.pack_size}
                helperText={errors.pack_size}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default EditProduct;
