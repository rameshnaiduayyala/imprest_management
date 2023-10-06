/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getBrands, getGenerics, getPackUoms, getProductForms, getUoms } from "../../services/common.svc";
import { getOneProduct, updateProduct } from "../../services/product.svc";
import { KeyValue } from "../../models/keyvalue.model";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [generic, setGeneric] = useState<KeyValue[]>([]);
    const [brand, setBrand] = useState<KeyValue[]>([]);
    const [packuom, setPackuom] = useState<KeyValue[]>([]);
    const [uom, setUom] = useState<KeyValue[]>([]);
    const [productform, setProductform] = useState<KeyValue[]>([]);
    const [product, setProduct] = useState({
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

    useEffect(() => {
        fetchGenerics();
        fetchBrands();
        fetchPackuom();
        fetchUom();
        fetchProductForm();
        fetchProductData(id);
    }, [id]);

    // Fetch Generic Data
    const fetchGenerics = async () => {
        try {
            const keyValues = await getGenerics();
            setGeneric(keyValues);
        } catch (error) {
            console.error("Fetch Generic Data failed:", error);
        }
    };

    // Fetch Brand Data
    const fetchBrands = async () => {
        try {
            const keyValues = await getBrands();
            setBrand(keyValues);
        } catch (error) {
            console.error("Fetch Brand Data failed:", error);
        }
    };

    // Fetch Pack UOM Data
    const fetchPackuom = async () => {
        try {
            const keyValues = await getPackUoms();
            setPackuom(keyValues);
        } catch (error) {
            console.error("Fetch Pack UOM Data failed:", error);
        }
    };

    // Fetch UOM Data
    const fetchUom = async () => {
        try {
            const keyValues = await getUoms();
            setUom(keyValues);
        } catch (error) {
            console.error("Fetch UOM Data failed:", error);
        }
    };

    // Fetch Product Form Data
    const fetchProductForm = async () => {
        try {
            const keyValues = await getProductForms();
            setProductform(keyValues);
        } catch (error) {
            console.error("Fetch Product Form Data failed:", error);
        }
    };

    // Fetch existing product data for editing
    const fetchProductData = async (id: number) => {
        try {
            const existingProduct = await getOneProduct(id);
            setProduct(existingProduct);
        } catch (error) {
            console.error("Fetch Product Data failed:", error);
        }
    };
    console.log(product, "Product details hgyuhguhglgygoygugygy")

    const handleChange = (field: any, value: any) => {
        setProduct((prevProducts) => ({
            ...prevProducts,
            [field]: value,
        }));
    };

    const handleCancel = () => {
        navigate("/productlist");
    };

    const handleUpdate = async () => {
        try {
            await updateProduct(id, product);
            navigate("/productlist");
        } catch (error) {
            console.error("Failed to update product", error);
        }
    };
    return (
        <>
            <div className="editproduct">
                <h2>
                    <InventoryIcon />
                    Edit Product
                </h2>
            </div>
            <Box className="edit_product_container" component="form">
                <div className="outer_container">
                    <Grid container className="inner_container" spacing={1}>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <ReusableTextField
                                value={product.description}
                                onChange={(value) => handleChange("description", value)}
                                name="description"
                                label={"Description"}
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <ReusableTextField
                                value={product.strength}
                                onChange={(value) => handleChange("strength", value)}
                                type="text"
                                placeholder="Strength"
                                label={"Strength"}
                                name="strength"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <ReusableTextField
                                placeholder="Short_code"
                                value={product.short_code}
                                onChange={(value) => handleChange("short_code", value)}
                                type="text"
                                label={"Short Code"}
                                name="short_code"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <ReusableTextField
                                placeholder="Pack_size"
                                value={product.pack_size}
                                onChange={(value) => handleChange("pack_size", value)}
                                type="number"
                                label={"Pack size"}
                                name="pack_size"
                            />
                        </Grid>
                    </Grid>

                    <Grid container className="inner_container" spacing={1}>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <Dropdown
                                name="Pack UOM"
                                options={packuom}
                                value={product.pack_uom_id}
                                onChange={(value) => handleChange("pack_uom_id", value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <Dropdown
                                name="Measure"
                                options={uom}
                                value={product.measure_id}
                                onChange={(value) => handleChange("measure_id", value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <Dropdown
                                name="Product Form"
                                options={productform}
                                value={product.product_form_id}
                                onChange={(value) => handleChange("product_form_id", value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <Dropdown
                                name="Brand"
                                options={brand}
                                value={product.brand_id}
                                onChange={(value) => handleChange("brand_id", value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} className="grid_item_space">
                            <Dropdown
                                name="Generic"
                                options={generic}
                                value={product.generic_id}
                                onChange={(value) => handleChange("generic_id", value)}
                            />
                        </Grid>
                    </Grid>
                    <div className="buttons">
                        <CustomButton
                            className="updatebtn"
                            type="submit"
                            onClick={handleUpdate}
                        >
                            Update
                        </CustomButton>
                        <CustomButton
                            className="buttoncancel"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                        >
                            Cancel
                        </CustomButton>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default EditProduct;
