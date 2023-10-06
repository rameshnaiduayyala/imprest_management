import React, { useState, useEffect } from "react";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReusableTable from "../../components/common/Table";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getProduct } from "../../services/product.svc";

const headCells = [
  { id: "id", label: "Id", IsNestedProprty: false },
  { id: "description", label: "Description", IsNestedProprty: false },
  { id: "strength", label: "Strength", IsNestedProprty: false },
  { id: "short_code", label: "Short code", IsNestedProprty: false},
  { id: "pack_size", label: "Pack size", IsNestedProprty: false },
  { id: "pack_unit_of_measure.name", label: "pack uom", IsNestedProprty: true },
  { id: "unit_of_measure.name", label: "UOM", IsNestedProprty: true },
  { id: "product_form.name", label: "Product Form", IsNestedProprty: true },
  { id: "brand.name", label: "Brand", IsNestedProprty: true },
  { id: "generic_name.name", label: "Generic Name", IsNestedProprty: true },
  { id: "actions", label: "Actions", IsNestedProprty: false },
];

const ProductList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (e: string | number | any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setData(data);
  }, [data, search]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProduct();
      const jsonData = await response.data;
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Handle Edit Methode
  const handleEdit = (id: number) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <div className="subpage_content">
      <div className="static_title">
        <h2 className="page_main_title">Products</h2>
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
          onClick={() => navigate("/addproduct")}
        >
          Add Product
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
          <ReusableTable columns={headCells} data={data} onEdit={handleEdit} />
        )}
      </Paper>
    </div>
  );
};

export default ProductList;
