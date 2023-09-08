import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
// import axios from axios;
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

function StockUpdate() {
  const classes = useStyles();
  const {id}=useParams()
   const navigate=useNavigate()
  const [formData, setFormData] = useState<FormData>(initialFormData);
  console.log(formData, "form");
  const generateKey = (label: string) =>
    label.toLowerCase().replace(/\s/g, "") as keyof FormData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



 useEffect(() => {

    // Fetch item data based on itemId when the component mounts

    async function fetchItemData() {

      try {

        const response = await fetch(`https://rameshayyala.vercel.app/imprest_item/${id}`);

        if (response.ok) {

          const itemData = await response.json();
          console.log(itemData,"itemdata")
          setFormData(itemData[0]);
          

        } else {

          console.error('Failed to fetch item data');

        }

      } catch (error) {

        console.error('An error occurred:', error);

      }

    }

 

    fetchItemData();

  }, []);

 
const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

 

    try {

      const response = await fetch(

        `https://rameshayyala.vercel.app/imprest_item/${id}`,

        {

          method: 'PUT',

          headers: {

            'Content-Type': 'application/json',

          },

          body: JSON.stringify(formData),

        }

      );

 

      if (response.ok) {

        toast.success('Data updated successfully', { position: 'top-right' });

        navigate('/imprest'); // Redirect back to the stock page

      } else {

        console.error('Failed to update form data');

      }

    } catch (error) {

      console.error('An error occurred:', error);

    }

  };

 const handleReset = () => {
    toast.error("You have canceled", { position: "top-center" });
    setFormData(initialFormData);
    navigate("/imprest")
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
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default StockUpdate;
