import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Grid,
  makeStyles,
  Typography,
  MenuItem,
} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
  },
}));

const fieldLabels = [
  { label: "Barcode", type: "text" },
  { label: "SKU ID", type: "number" },
  { label: "Name", type: "text" },
  {
    label: "Category",
    type: "select",
    options: ["syrups", "vaccine", "drugs"],
  },
  { label: "Description", type: "text" },
  { label: "Min Stock", type: "number" },
  { label: "Max Stock", type: "number" },
  { label: "Available Stock", type: "number" },
];

const initialFormData = {
  barcode: "",
  skuid: "",
  name: "",
  category: "",
  description: "",
  minstock: "",
  maxstock: "",
  availablestock: "",
};

type FormData = typeof initialFormData;

function StockData() {
  const classes = useStyles();
  const navigate=useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const generateKey = (label: string) =>
    label.toLowerCase().replace(/\s/g, "") as keyof FormData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fetchapi=await axios.post("https://rameshayyala.vercel.app/imprest_item",formData)
    console.log(fetchapi,"fetchapi")
    if(fetchapi.status==201){
      toast.success("data created");
      
   setTimeout(()=>{    navigate("/stock")},2000)
    }else{
      toast.error("data faield")
    }
   
  };

  const handleReset = () => {
    toast.error("You have canceled", { position: "top-center" });
    setFormData(initialFormData);
    
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Items
        </Typography>
        
        <hr style={{ borderBottom: "2px solid black" }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fieldLabels.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {field.type === "select" && field.options ? (
                  <TextField
                    select
                    name={field.label.toLowerCase().replace(/\s/g, "")}
                    label={field.label}
                    fullWidth
                    value={formData[generateKey(field.label)]}
                    onChange={handleChange}
                    required
                  >
                    {field.options.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    name={field.label.toLowerCase().replace(/\s/g, "")}
                    label={field.label}
                    fullWidth
                    type={field.type}
                    value={formData[generateKey(field.label)]}
                    onChange={handleChange}
                    required
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12} style={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleReset}
                style={{ marginLeft: "10px" }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default StockData;
